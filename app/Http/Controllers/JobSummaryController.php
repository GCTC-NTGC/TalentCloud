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
        $advisor = $user->hr_advisor;
        $jobIsClaimed = ($advisor !== null) &&
            $advisor->claimed_job_ids->contains($job->id);

        $summaryLang = Lang::get('hr_advisor/job_summary');

        $view_applicants_data = [
            'imgSrc' => '/images/job-process-summary-tool-applicants.svg',
            'imgAlt' => "{$summaryLang['view_applicants_icon']} {$summaryLang['flat_icons']}",
            'text' => $summaryLang['view_applicants_button'],
            'url' => route('hr_advisor.jobs.applications', $job),
            'disabled' => $job->isClosed(),
        ];

        switch ($job->job_status_id) {
            case 1:
                $status = Lang::get('common/lookup/job_status.draft');
                break;
            case 2:
                $status = Lang::get('common/lookup/job_status.in_review');
                break;
            case 3:
                $status = Lang::get('common/lookup/job_status.approved');
                break;
            case 4:
                $status = Lang::get('common/lookup/job_status.open');
                break;
            case 5:
                $status = Lang::get('common/lookup/job_status.closed');
                break;
            case 6:
                $status = Lang::get('common/lookup/job_status.complete');
                break;
        }
        // TODO: This should change based on the current status.
        $status_description = $job->job_status_id == 2
            ? $summaryLang['under_review']
            : '';

        $data = [
            // Localized strings.
            'summary' => $summaryLang,
            'job_status' => $status,
            'job_status_description' => $status_description,
            'is_claimed' => $jobIsClaimed,
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
            'job_review_url' => route('hr_advisor.jobs.review', $job),
            'job_preview_url' => '/',
            'screening_plan_url' => '/',
            'view_applicants_data' => $view_applicants_data,
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
     * @param  \Illuminate\Http\Request $request Incoming request object.
     * @param  \App\Models\JobPoster  $job
     * @return \Illuminate\Http\Response
     */
    public function unclaimJob(Request $request, JobPoster $job)
    {
        $hrAdvisor = $request->user()->hr_advisor;
        $hrAdvisor->claimed_jobs()->detach($job);

        return redirect()->route('hr_advisor.jobs.index');
    }
}
