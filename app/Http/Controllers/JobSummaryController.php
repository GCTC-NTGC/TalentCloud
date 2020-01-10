<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\JobPoster;
use App\Models\HrAdvisor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;

class JobSummaryController extends Controller
{
    /**
     * Display the specified job summary.
     *
     * @param  \Illuminate\Http\Request $request Incoming request object.
     * @param  \App\Models\JobPoster $job Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, JobPoster $job)
    {
        $user = Auth::user();

        $applications = $job->submitted_applications;

        $data = [
            // Localized strings.
            'summary' => Lang::get('hr_advisor/job_summary'),
            // User data.
            'user' => $user,
            // Job Poster data.
            'job' => $job,
            // Application data.
            'applications' => $applications,
            // TODO: Add Routes.
            // 'send_manager' => ,
            // 'send_translation' => ,
            // 'approve_publishing' => ,
            'relinquish_job' => route('hr_advisor.jobs.unclaim', $job),
        ];

        return view(
            'hr_advisor/job_summary',
            $data
        );
    }

    /**
     * Unclaim a Job Poster.
     *
     * @param  \App\Models\HrAdvisor  $hrAdvisor
     * @param  \App\Models\JobPoster  $job
     * @return \Illuminate\Http\Response
     */
    public function unclaimJob(HrAdvisor $hrAdvisor, JobPoster $job)
    {
        $hrAdvisor->claimed_jobs()->detach($job);

        return redirect()->route('hr_advisor.jobs.summary', $job);
    }
}
