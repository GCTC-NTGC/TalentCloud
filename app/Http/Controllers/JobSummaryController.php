<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\JobPoster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class JobSummaryController extends Controller
{
    /**
     * Display the specified job summary.
     *
     * @param  \Illuminate\Http\Request $request   Incoming request object.
     * @param  \App\Models\JobPoster    $jobPoster Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, JobPoster $jobPoster)
    {
        $jobPoster->load([
            'department',
            'criteria.skill.skill_type',
            'manager.team_culture',
            'manager.work_environment'
        ]);

        $user = Auth::user();

        $data = [
            // Localized strings.
            'job_summary' => Lang::get('hr_advisor/job_summary'),
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
