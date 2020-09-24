<?php

namespace App\Http\Controllers;

use App\Http\Resources\Experience as ExperienceResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;
use App\Models\JobApplication;
use App\Models\JobApplicationVersion;
use App\Models\JobPoster;
use App\Models\Skill;
use App\Models\Lookup\ReviewStatus;
use Facades\App\Services\WhichPortal;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $applications = Auth::user()->applicant->job_applications;
        return view(
            'applicant/application_index',
            [
                'application_index' => Lang::get('applicant/application_index'),
                'applications' => $applications,
                'manager_profile_photo' => '/images/user.png', // TODO: get real photo.
            ]
        );
    }

    /**
     * Determine whether the user can view the jobApplication.
     *
     * @param  \App\Models\JobPoster    $jobPoster Incoming JobPoster object.
     * @param  \App\Models\JobApplication $application Incoming Application object.
     * @return \Illuminate\Http\Response
     */
    public function showWithJob(JobPoster $jobPoster, JobApplication $application)
    {
        if ($jobPoster->job_applications->contains($application)) {
            // If the application is version two then show new manager review application page.
            $applicationVersionTwo = JobApplicationVersion::where('version', 2)->first();
            if ($application->version_id == $applicationVersionTwo->version) {
                return $this->showVersionTwo($jobPoster, $application);
            }
            return $this->show($application);
        } else {
            return abort(404);
        }
    }

    /**
     * Display version two application.
     * @param  \App\Models\JobPoster    $jobPoster Incoming JobPoster object.
     * @param  \App\Models\JobApplication $application Incoming Application object.
     * @return \Illuminate\Http\Response
     */
    public function showVersionTwo(JobPoster $jobPoster, JobApplication $application)
    {
        if (WhichPortal::isManagerPortal() || WhichPortal::isHrPortal()) {
            // Load things required for review component.
            $application->loadMissing([
                'veteran_status',
                'citizenship_declaration',
                'application_review',
                'applicant.user',
                'experiences_work.experience_skills',
                'experiences_personal.experience_skills',
                'experiences_education.experience_skills',
                'experiences_award.experience_skills',
                'experiences_community.experience_skills',
            ]);
        }

        $experiences = array_merge(
            ExperienceResource::collection($application->experiences_award)->all(),
            ExperienceResource::collection($application->experiences_community)->all(),
            ExperienceResource::collection($application->experiences_education)->all(),
            ExperienceResource::collection($application->experiences_personal)->all(),
            ExperienceResource::collection($application->experiences_work)->all()
        );

        $experienceSkills = [];
        foreach ($experiences as $experience) {
            foreach ($experience->experience_skills as $experienceSkill) {
                array_push($experienceSkills, $experienceSkill);
            }
        };

        return view(
            'manager/application_timeline_review',
            [
                'applicant' => $application->applicant,
                'applicant_user' => $application->applicant->user,
                'application' => $application,
                'application_template' => Lang::get('applicant/application_template'),
                'criteria' => $jobPoster->criteria,
                'experiences' => $experiences,
                'experience_skills' => $experienceSkills,
                'job' => $jobPoster,
                'job_application_answers' => $application->job_application_answers,
                'job_questions' => $jobPoster->job_poster_questions,
                'review_statuses' => ReviewStatus::all(),
                'show_review' => true,
                'is_hr_portal' => WhichPortal::isHrPortal(),
            ]
        );
    }

    /**
     * Display specified application
     *
     * @param  \App\Models\JobApplication $application Incoming Application object.
     * @return \Illuminate\Http\Response
     */
    public function show(JobApplication $application)
    {
        $response_poster = false;
        $show_review = true;
        $jobPoster = $application->job_poster;

        if ($jobPoster->isInStrategicResponseDepartment()) {
            $response_poster = true;
            $show_review = false;
        }

        $essential_criteria = $jobPoster->criteria->filter(function ($value, $key) {
            return $value->criteria_type->name == 'essential'
                && $value->skill->skill_type->name == 'hard';
        });
        $asset_criteria = $jobPoster->criteria->filter(function ($value, $key) {
            return $value->criteria_type->name == 'asset'
                && $value->skill->skill_type->name == 'hard';
        });

        // Display slightly different views on different portals.
        $view = WhichPortal::isManagerPortal() || WhichPortal::isHrPortal() ?
            'manager/application_post' : 'applicant/application_preview';

        $application_view = $response_poster
            ? 'applicant/strategic_response_application/application_view/application_layout'
            : 'common/application/view/view_layout';

        if (WhichPortal::isManagerPortal() || WhichPortal::isHrPortal()) {
            // Load things required for review component.
            $application->load(['veteran_status', 'citizenship_declaration', 'application_review', 'applicant.user']);
        }


        // If the application status is draft then get data through the applicant model.
        // Else, grab the data from the application itself.
        if ($application->isDraft()) {
            $source = $application->applicant;
            $show_review = false;
        } else {
            $source = $application;
        }

        $degrees = $source->degrees;
        $courses = $source->courses;
        $work_experiences = $source->work_experiences;
        $skill_declarations = $source->skill_declarations;
        $references = $source->references;
        $work_samples = $source->work_samples;

        $custom_breadcrumbs = [
            'home' => route('home'),
            'applications' =>  route('applications.index'),
            'application' => '',
        ];

        if (WhichPortal::isManagerPortal() || WhichPortal::isHrPortal()) {
            $custom_breadcrumbs = [
                'home' => route('home'),
                'jobs' => route(WhichPortal::prefixRoute('jobs.index')),
                $jobPoster->title => route(WhichPortal::prefixRoute('jobs.summary'), $jobPoster),
                'applications' =>  route(WhichPortal::prefixRoute('jobs.applications'), $jobPoster),
                'application' => '',
            ];
        }

        return view(
            $view,
            [
                'application_view_template' => $application_view,
                // Localized strings.
                'post' => Lang::get('manager/application_post'), // Change text
                'is_manager_view' => WhichPortal::isManagerPortal(),
                'is_hr_portal' => WhichPortal::isHrPortal(),
                // Application Template Data.
                'application_template' => Lang::get('applicant/application_template'),
                'citizenship_declaration_template' => Lang::get('common/citizenship_declaration'),
                'veteran_status_template' => Lang::get('common/veteran_status'),
                // Job Data.
                'job' => $jobPoster,
                // Skills Data.
                'skills' => Skill::all(),
                'skill_template' => Lang::get('common/skills'),
                'reference_template' => Lang::get('common/references'),
                'sample_template' => Lang::get('common/work_samples'),
                'essential_criteria' => $essential_criteria,
                'asset_criteria' => $asset_criteria,
                // Applicant Data.
                'applicant' => $application->applicant,
                'job_application' => $application,
                'degrees' => $degrees,
                'courses' => $courses,
                'work_experiences' => $work_experiences,
                'skill_declarations' => $skill_declarations,
                'references' => $references,
                'work_samples' => $work_samples,
                'review_statuses' => ReviewStatus::all(),
                'custom_breadcrumbs' => $custom_breadcrumbs,
                'response_poster' => $response_poster,
                'show_review' => $show_review,
            ]
        );
    }

    /**
     * Delete the particular resource from storage.
     *
     * @param  \Illuminate\Http\Request   $request     Incoming Request object.
     * @param  \App\Models\JobApplication $application Incoming Application object.
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, JobApplication $application)
    {
        $this->authorize('delete', $application);

        $application->delete();

        if ($request->ajax()) {
            return [
                'message' => 'Application deleted'
            ];
        }

        return redirect()->back();
    }
}
