<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;

class ApplicationTimelineController extends Controller
{
    public function show(JobApplication $jobApplication)
    {
        return view('applicant/application-timeline-root')
            ->with([
                'title' => $jobApplication->job_poster->title, // TODO: Check with design what the title should be.
                'diable_clone_js' => true,
            ]);
    }
}
