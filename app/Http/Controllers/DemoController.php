<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use App\Models\JobPoster;
use App\Models\JobApplication;

class DemoController extends Controller
{
    /**
     * Display a listing of the applicants to specified job.
     *
     * @return \Illuminate\Http\Response
     */
    public function reviewApplications()
    {
        if (\App::environment('local')) {
            $jobPoster = factory(JobPoster::class)->state('closed')->create();
            $applications = factory(JobApplication::class, 10)->create([
                'job_poster_id' => $jobPoster->id
            ]);
            $jobPoster->submitted_applications()->saveMany($applications);

            $applications->load(['veteran_status', 'citizenship_declaration', 'application_review', "applicant.user"]);
            return view('manager/review_applications', [
                /*Localization Strings*/
                'jobs_l10n' => Lang::get('manager/job_index'),

                /* Data */
                'job' => $jobPoster,
                'applications' => $applications,
                'review_statuses' => ReviewStatus::all(),
            ]);
        }
        return null;
    }
}
