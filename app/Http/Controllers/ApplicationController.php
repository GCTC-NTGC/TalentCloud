<?php

namespace App\Http\Controllers;

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
     * Display the application preview.
     *
     * @param  \App\Models\JobPoster    $jobPoster Incoming JobPoster object.
     * @param  \App\Models\JobApplication $application Incoming Application object.
     * @return \Illuminate\Http\Response
     */
    public function show(JobApplication $application)
    {
        // If the application is version two then show the version two application review page.
        if ($application->version_id !== null && $application->version_id == 2) {
            return $this->showVersionTwo($application);
        }
        return $this->showVersionOne($application);
    }

    /**
     * Display the application preview with the review toolbar.
     *
     * @param  \App\Models\JobPoster    $jobPoster Incoming JobPoster object.
     * @param  \App\Models\JobApplication $application Incoming Application object.
     * @return \Illuminate\Http\Response
     */
    public function showWithToolbar(JobPoster $jobPoster, JobApplication $application)
    {
        if ($jobPoster->job_applications->contains($application)) {
            // If the application is version two then show the version two application review page.
            if ($application->version_id !== null && $application->version_id == 2) {
                return $this->showVersionTwo($application);
            }
            return $this->showVersionOne($application);
        } else {
            return abort(404);
        }
    }

    /**
     * Display specified application (version 2)
     *
     * @param  \App\Models\JobApplication $application Incoming Application object.
     * @return \Illuminate\Http\Response
     */
    public function showVersionTwo(JobApplication $application)
    {
        if (WhichPortal::isManagerPortal() || WhichPortal::isHrPortal()) {
            return view(
                'manager/application_timeline_review',
                [
                    'applicant' => $application->applicant,
                    'application' => $application,
                    'application_template' => Lang::get('applicant/application_template'),
                    'job_id' => $application->job_poster_id,
                    'review_statuses' => ReviewStatus::all(),
                    'is_hr_portal' => WhichPortal::isHrPortal(),
                ]
            );
        } else {
            return view(
                'applicant/application_timeline_preview',
                [
                    'applicant' => $application->applicant,
                    'application' => $application,
                    'application_template' => Lang::get('applicant/application_template'),
                    'job_id' => $application->job_poster_id,
                ]
            );
        }
    }

    /**
     * Display specified application (version 1)
     *
     * @param  \App\Models\JobApplication $application Incoming Application object.
     * @return \Illuminate\Http\Response
     */
    public function showVersionOne(JobApplication $application)
    {
        $response_poster = false;
        $show_review = true;
        $jobPoster = $application->job_poster;

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

        $application_view = 'common/application/view/view_layout';

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
