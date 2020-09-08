<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use App\Models\JobPoster;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;

class ApplicationTimelineController extends Controller
{
    /**
     * Show the application submission information.
     *
     * @param  \App\Models\JobPoster $jobPoster Incoming Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function complete(/* JobPoster $jobPoster */)
    {
        // Dummy Data
        $applicant = Auth::user()->applicant;
        $jobPoster = JobPoster::where('job_poster_status_id', '10')->first();
        $application = JobApplication::where('job_poster_id', $jobPoster->id)->first();

        return view(
            'applicant/application/10-congrats',
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

    public function show(JobApplication $jobApplication)
    {
        return view('applicant/application-timeline-root')
            ->with([
                'title' => $jobApplication->job_poster->title, // TODO: Check with design what the title should be.
            ]);
    }
}
