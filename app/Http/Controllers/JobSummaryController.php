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

        $job_review_data = [
            'imgSrc' => '/images/job-process-summary-tool-edit.svg',
            'imgAlt' => "{$summaryLang['edit_poster_icon']} {$summaryLang['flat_icons']}",
            'text' => $summaryLang['edit_poster_button'],
            'url' => route('hr_advisor.jobs.review', $job),
            'disabled' => false,
        ];

        $job_preview_data = [
            'imgSrc' => '/images/job-process-summary-tool-view.svg',
            'imgAlt' => "{$summaryLang['view_poster_icon']} {$summaryLang['flat_icons']}",
            'text' => $summaryLang['view_poster_button'],
            'url' => route('hr_advisor.jobs.preview', $job),
            'disabled' => false,
        ];

        $screening_plan_data = [
            'imgSrc' => '/images/job-process-summary-tool-screen.svg',
            'imgAlt' => "{$summaryLang['screening_plan_icon']} {$summaryLang['flat_icons']}",
            'text' => $summaryLang['screening_plan_button'],
            'url' => route('hr_advisor.jobs.screening_plan', $job),
            'disabled' => false
        ];

        $view_applicants_data = [
            'imgSrc' => '/images/job-process-summary-tool-applicants.svg',
            'imgAlt' => "{$summaryLang['view_applicants_icon']} {$summaryLang['flat_icons']}",
            'text' => $summaryLang['view_applicants_button'],
            'url' => route('hr_advisor.jobs.applications', $job),
            'disabled' => !$job->isClosed(),
        ];



        switch ($job->job_poster_status->name) {
            case 'draft':
                $status = Lang::get('common/lookup/job_status.draft');
                break;
            case 'review_hr':
            case 'review_manager':
                $status = Lang::get('common/lookup/job_status.in_review');
                break;
            case 'translation':
                $status = Lang::get('common/lookup/job_status.in_translation');
                break;
            case 'final_review_manager':
            case 'final_review_hr':
                $status = Lang::get('common/lookup/job_status.final_review');
                break;
            case 'approved':
                $status = Lang::get('common/lookup/job_status.approved');
                break;
            case 'published':
                if ($job->isOpen()) {
                    $status = Lang::get('common/lookup/job_status.open');
                } elseif ($job->isClosed()) {
                    $status = Lang::get('common/lookup/job_status.closed');
                } else {
                    $status = Lang::get('common/lookup/job_status.published');
                }
                break;
            case 'completed':
                $status = Lang::get('common/lookup/job_status.completed');
                break;
        }
        // TODO: Need to add more descriptions for different statuses
        $status_description =
            ($job->job_poster_status->name === 'review_hr'
                || $job->job_poster_status->name === 'review_manager'
                || $job->job_poster_status->name === 'final_review_manager'
                || $job->job_poster_status->name === 'final_review_hr')
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
            'send_manager' => '', //route('hr_advisor.jobs.setJobStatus', ['jobPoster'=> $job, 'status' => 'review_manager']),
            'send_translation' => '', //route('hr_advisor.jobs.setJobStatus', ['jobPoster'=> $job, 'status' => 'translation']),
            'approve_publishing' => '', //route('hr_advisor.jobs.setJobStatus', ['jobPoster'=> $job, 'status' => 'approved']),

            'job_review_data' => $job_review_data,
            'job_preview_data' => $job_preview_data,
            'screening_plan_data' => $screening_plan_data,
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
