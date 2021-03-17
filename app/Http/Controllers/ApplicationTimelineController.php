<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use Illuminate\Support\Facades\Lang;

class ApplicationTimelineController extends Controller
{
    /**
     * Display job application.
     *
     * @param JobApplication $application
     * @param string|null $requestedStep If this is null, redirect to the last touched step.
     * @return void
     */
    public function show(JobApplication $application, string $requestedStep = null)
    {
        $jobApplicationSteps = $application->jobApplicationSteps();
        $stepOrder = [
            'basic',
            'experience',
            'skills',
            'fit',
            'review',
            'submission'
        ];

        $lastTouchedStep = function () use ($stepOrder, $jobApplicationSteps) {
            $reversedStepOrder = array_reverse($stepOrder);
            foreach ($reversedStepOrder as $step) {
                if ($jobApplicationSteps[$step] === 'complete' ||
                    $jobApplicationSteps[$step] === 'error'
                ) {
                    return $step;
                }
            }

            return 'welcome';
        };

        $customBreadcrumbs = [
            'home' => route('home'),
            'applications' => route('applications.index'),
            $application->job_poster->title => route('jobs.summary', ['jobPoster' => $application->job_poster]),
            Lang::get('common/breadcrumbs.application_id', ['id' => $application->id]) => '',
        ];


        if ($requestedStep === 'welcome') {
            return view('applicant/application-timeline-root')
                ->with([
                    'title' => $application->job_poster->title,
                    'disable_clone_js' => true,
                    'custom_breadcrumbs' => $customBreadcrumbs,
                ]);
        }

        if ($requestedStep !== null) {
            // Show the requested step if it has been touched before.
            // Else, redirect the user to the last touched step.
            // If no step has been touched, then take them to welcome step.
            if (array_key_exists($requestedStep, $jobApplicationSteps) &&
                ($jobApplicationSteps[$requestedStep] === 'complete' || $jobApplicationSteps[$requestedStep] === 'error')
            ) {
                return view('applicant/application-timeline-root')
                ->with([
                    'title' => $application->job_poster->title,
                    'disable_clone_js' => true,
                    'custom_breadcrumbs' => $customBreadcrumbs,
                ]);
            } else {
                return redirect(
                    route('applications.timeline.step', ['application' => $application, 'step' => $lastTouchedStep()])
                );
            }
        } else {
            // If no step has been entered (/application/id) then redirect user to the last touched step.
            // If no step has been touched, then take them to welcome step.
            return redirect(
                route('applications.timeline.step', ['application' => $application, 'step' => $lastTouchedStep()])
            );
        }
    }

    /**
     * Show the congrats page after application it's validated and submit.
     *
     * @param  \App\Models\JobApplication $application Incoming Job Application object.
     * @return \Illuminate\Http\Response
     */
    public function complete(JobApplication $application)
    {
        // Dummy Data.
        $applicant = $application->applicant;
        $jobPoster = $application->job_poster;

        return view(
            'applicant/application/congrats',
            [
                'applicant' => $applicant,
                'application' => $application,
                'application_template' => Lang::get(
                    'applicant/application_template',
                    ['security_clearance' => $jobPoster->security_clearance->value ]
                ),
                'jobPoster' => $jobPoster,
            ]
        );
    }
}
