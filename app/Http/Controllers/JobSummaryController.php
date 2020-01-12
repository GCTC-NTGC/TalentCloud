<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\HrAdvisor;
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

        $applications = $jobPoster->submitted_applications;
        $advisor = $user->hr_advisor;
        $jobIsClaimed = ($advisor !== null) &&
            $advisor->claimed_jobs->pluck('id')->contains($jobPoster->id);

        $data = [
            // Localized strings.
            'summary' => Lang::get('hr_advisor/job_summary'),
            'is_claimed' => $jobIsClaimed,
            // User data.
            'user' => $user,
            // Job Poster data.
            'job' => $jobPoster,
            // Application data.
            'applications' => $applications,
            // TODO: Add Routes.
            // 'send_manager' => ,
            // 'send_translation' => ,
            // 'approve_publishing' => ,
            'relinquish_job' => route('hr_advisor.jobs.unclaim', $jobPoster),
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
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function unclaimJob(HrAdvisor $hrAdvisor, JobPoster $jobPoster)
    {
        $hrAdvisor->claimed_jobs()->detach($jobPoster);

        return redirect()->route('hr_advisor.jobs.summary', $jobPoster);
    }
}
