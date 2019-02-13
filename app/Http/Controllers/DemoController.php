<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use App\Models\JobPoster;

class DemoController extends Controller
{
    /**
     * Display a listing of the applicants to specified job.
     *
     * @return \Illuminate\Http\Response
     */
    public function reviewApplications()
    {
        $jobPoster = factory(JobPoster::class)->create();
        return view('manager/review_applications', [
            /*Localization Strings*/
            'jobs_l10n' => Lang::get('manager/job_index'),

            /* Data */
            'job' => $jobPoster,
            'applications' => $jobPoster->submitted_applications,
        ]);
    }
}
