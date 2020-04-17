<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\JobPoster;
use Facades\App\Services\WhichPortal;

class JobBuilderController extends Controller
{
    /**
     * Show the Job Builder mini SPA
     * @return \Illuminate\Http\Response
     */
    public function show(JobPoster $jobPoster)
    {
        $custom_breadcrumbs = [
            'home' => route(WhichPortal::prefixRoute('home')),
            'jobs' => route(WhichPortal::prefixRoute('jobs.index')),
            'job-builder' => '',
        ];

        return view(
            'manager/job-builder-root'
        )->with([
            'title' => Lang::get('manager/job_builder.title'),
            'custom_breadcrumbs' => $custom_breadcrumbs
        ]);
    }

    public function hrReview(JobPoster $jobPoster)
    {
        return view('hr_advisor/job_review', [
            'title' => Lang::get('hr_advisor/job_review.title'),
            'job' => $jobPoster
        ]);
    }
}
