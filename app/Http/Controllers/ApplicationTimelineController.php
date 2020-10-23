<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use App\Models\JobPoster;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;

class ApplicationTimelineController extends Controller
{
    /**
     * Display job application.
     *
     * @param  \App\Models\JobApplication $application Incoming Application object.
     * @return \Illuminate\Http\Response
    */
    public function show(JobApplication $jobApplication, string $step = null)
    {
        $requestedStep = $step;
        $jobApplicationSteps = $jobApplication->jobApplicationSteps();
        $stepOrder = [
            'basic',
            'experience',
            'skills-intro' => 'skills',
            'skills',
            'fit',
            'review',
            'submission'
        ];


        // If the applicant has previously reached the requested step
        // then return them to the step.

        if (
            $requestedStep !== null &&
            array_key_exists($requestedStep, $jobApplicationSteps) &&
            ($jobApplicationSteps[$requestedStep] === 'complete' || $jobApplicationSteps[$requestedStep] === 'error')
        ) {
            return view('applicant/application-timeline-root')
            ->with([
                'title' => $jobApplication->job_poster->title, // TODO: Check with design what the title should be.
                'disable_clone_js' => true,
            ]);
        }

        // If the applicant has not reached the requested step
        // in the application then redirect back to last touched step.
        $reversedStepOrder = array_reverse($stepOrder);
        foreach ($reversedStepOrder as $lastTouchedStep) {
            if ($jobApplicationSteps[$lastTouchedStep] === 'complete' || $jobApplicationSteps[$lastTouchedStep] === 'error') {
                return redirect()->route('application.timeline', ['jobApplication' => $jobApplication, 'step' => $lastTouchedStep]);
            }
        }

        // If no step has been reached yet it will take applicant to welcome step.
        return view('applicant/application-timeline-root')
            ->with([
                'title' => $jobApplication->job_poster->title, // TODO: Check with design what the title should be.
                'disable_clone_js' => true,
            ]);
    }
}
