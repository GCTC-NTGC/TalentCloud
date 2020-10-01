<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use App\Models\JobPoster;

class ApplicationTimelineController extends Controller
{
    /**
     * Display job application.
     *
     * @param  \App\Models\JobApplication $application Incoming Application object.
     * @return \Illuminate\Http\Response
    */
    public function show(JobApplication $jobApplication)
    {
        return view('applicant/application-timeline-root')
            ->with([
                'title' => $jobApplication->job_poster->title, // TODO: Check with design what the title should be.
                'disable_clone_js' => true,
            ]);
    }
}
