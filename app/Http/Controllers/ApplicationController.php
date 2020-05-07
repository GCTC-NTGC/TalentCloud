<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;
use App\Models\JobApplication;
use App\Models\Skill;
use App\Models\Lookup\ReviewStatus;
use Facades\App\Services\WhichPortal;
use Illuminate\Support\Facades\Log;

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
        $applications_in_progress = [];
        $completed_applications = [];
        $expired_applications = [];

        Log::debug($applications_in_progress);

        foreach ($applications as $application) {
            if ($application->application_status->name == 'draft' && $application->job_poster->isOpen()) {
                array_push($applications_in_progress, $application);
            }

            if ($application->application_status->name != 'draft') {
                array_push($completed_applications, $application);
            }

            if ($application->application_status->name == 'draft' && $application->job_poster->isClosed()) {
                array_push($expired_applications, $application);
            }
        }

        return view(
            'applicant/application_index',
            [
                'application_index' => Lang::get('applicant/application_index'),
                'applications' => $applications,
                'applications_in_progress' => $applications_in_progress,
                'completed_applications' => $completed_applications,
                'expired_applications' => $expired_applications,
                'manager_profile_photo' => '/images/user.png', // TODO: get real photo.
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

        if ($application->job_poster->isInStrategicResponseDepartment()) {
            $response_poster = true;
        }

        $essential_criteria = $application->job_poster->criteria->filter(function ($value, $key) {
            return $value->criteria_type->name == 'essential'
                && $value->skill->skill_type->name == 'hard';
        });
        $asset_criteria = $application->job_poster->criteria->filter(function ($value, $key) {
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
        } else {
            $source = $application;
        }

        $degrees = $source->degrees;
        $courses = $source->courses;
        $work_experiences = $source->work_experiences;
        $skill_declarations = $source->skill_declarations;
        $references = $source->references;
        $work_samples = $source->work_samples;

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
                'job' => $application->job_poster,
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
                'response_poster' => $response_poster,
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
