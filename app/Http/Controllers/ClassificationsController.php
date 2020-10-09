<?php

namespace App\Http\Controllers;
use App\Models\Classification;

use Illuminate\Http\Request;

class ClassificationsController extends Controller
{
    /**
     * Return the current applicant's application for a given Job Poster.
     *
     * @param  \App\Models\JobPoster $jobPoster Incoming JobPoster object.
     * @return mixed|\App\Models\JobApplication
     */
    public function getClassifications()
    {
        /*
        $application = JobApplication::where('applicant_id', Auth::user()->applicant->id)
            ->where('job_poster_id', $jobPoster->id)->first();
        if ($application == null) {
            $application = new JobApplication();
            $application->job_poster_id = $jobPoster->id;
            $application->applicant_id = Auth::user()->applicant->id;
            $application->application_status_id = ApplicationStatus::where('name', 'draft')->firstOrFail()->id;
            $application->save();
        }
        return $application;
        */
        return Classification::all();
    }
}
