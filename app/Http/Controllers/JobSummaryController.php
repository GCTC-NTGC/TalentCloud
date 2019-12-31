<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\JobPoster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;

class JobSummaryController extends Controller
{
    /**
     * Display the specified job summary.
     *
     * @param  \Illuminate\Http\Request $request Incoming request object.
     * @param  \App\Models\JobPoster $jobPoster Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, JobPoster $jobPoster)
    {
        $user = Auth::user();

        $data = [
            // Localized strings.
            'summary' => Lang::get('hr_advisor/job_summary'),
            // Applicant data.
            'user' => $user,
            // Job Poster data.
            'job' => $jobPoster,
            // Routes.
        ];

        return view(
            'hr_advisor/job_summary',
            $data
        );
    }
}
