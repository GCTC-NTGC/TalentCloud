<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\JobPoster;

class JobBuilderController extends Controller
{
    /**
     * Show the Job Builder mini SPA
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return view(
            'manager/job-builder-root'
        )->with([
            'title' => Lang::get('manager/job_builder.title'),
        ]);
    }

    public function hrReview(JobPoster $job)
    {
        return view('hr_advisor/job_review', [
            'title' => Lang::get('hr_advisor/job_review.title'),
            'job' => $job
        ]);
    }
}
