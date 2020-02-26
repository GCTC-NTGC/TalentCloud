<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\JobPoster;
use App\Models\Lookup\JobPosterStatusTransition;
use App\Services\JobStatusTransitionManager;
use Facades\App\Services\WhichPortal;
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
        $hr_advisors = $job->hr_advisors;

        $summaryLang = Lang::get('hr_advisor/job_summary');

        $job_review_data = [
            'imgSrc' => '/images/job-process-summary-tool-edit.svg',
            'imgAlt' => "{$summaryLang['edit_poster_icon']} {$summaryLang['flat_icons']}",
            'text' => $summaryLang['edit_poster_button'],
            'url' => route(WhichPortal::prefixRoute('jobs.review'), $job),
            'disabled' => false,
        ];

        $job_preview_data = [
            'imgSrc' => '/images/job-process-summary-tool-view.svg',
            'imgAlt' => "{$summaryLang['view_poster_icon']} {$summaryLang['flat_icons']}",
            'text' => $summaryLang['view_poster_button'],
            'url' => route(WhichPortal::prefixRoute('jobs.preview'), $job),
            'disabled' => false,
        ];

        $screening_plan_data = [
            'imgSrc' => '/images/job-process-summary-tool-screen.svg',
            'imgAlt' => "{$summaryLang['screening_plan_icon']} {$summaryLang['flat_icons']}",
            'text' => $summaryLang['screening_plan_button'],
            'url' => route(WhichPortal::prefixRoute('jobs.screening_plan'), $job),
            'disabled' => false
        ];

        $view_applicants_data = [
            'imgSrc' => '/images/job-process-summary-tool-applicants.svg',
            'imgAlt' => "{$summaryLang['view_applicants_icon']} {$summaryLang['flat_icons']}",
            'text' => $summaryLang['view_applicants_button'],
            'url' => route(WhichPortal::prefixRoute('jobs.applications'), $job),
            'disabled' => !$job->isClosed(),
        ];

        $status = $job->job_poster_status->name;
        $status_description = $job->job_poster_status->description;

        $portal = '';
        if (WhichPortal::isHrPortal()) {
            $portal = 'hr';
        } elseif (WhichPortal::isManagerPortal()) {
            $portal = 'manager';
        }

        $transitionManager = new JobStatusTransitionManager();
        $transitionToButton = function (JobPosterStatusTransition $transition) use ($user, $job, $transitionManager) {
            return [
                'text' => $transition->name,
                'url' => route(WhichPortal::prefixRoute('jobs.setJobStatus'), [
                    'jobPoster' => $job,
                    'status' => $transition->to->key
                ]),
                'style' => array_key_exists('button_style', $transition->metadata)
                    ? $transition->metadata['button_style']
                    : 'default',
                'disabled' => $transitionManager->userCanTransition($user, $transition->from->key, $transition->to->key)
            ];
        };
        $unclaimButton = [
            'unclaim_job' => [
                'text' => Lang::get('hr_advisor/job_summary.relinquish_button'),
                'url' => route('hr_advisor.jobs.unclaim', $job),
                'style' => 'stop',
                'disabled' => !$jobIsClaimed,
            ]
        ];

        $buttonGroups = [];

        $transitionButtons = $transitionManager->legalTransitions($job->job_poster_status->key)
            ->map($transitionToButton);
        array_push($buttonGroups, $transitionButtons);

        if (WhichPortal::isHrPortal()) {
            array_push($buttonGroups, $unclaimButton);
        }

        $data = [
            // Localized strings.
            'summary' => $summaryLang,
            'job_status' => $status,
            'job_status_description' => $status_description,
            'is_claimed' => $jobIsClaimed,
            // User data.
            'user' => $user,
            // HR Advisor data.
            'hr_advisors' => $hr_advisors,
            // Job Poster data.
            'job' => $job,
            // Application data.
            'applications' => $applications,
            'side_button_groups' => $buttonGroups,
            'job_review_data' => $job_review_data,
            'job_preview_data' => $job_preview_data,
            'screening_plan_data' => $screening_plan_data,
            'view_applicants_data' => $view_applicants_data,
            'portal' => $portal,
        ];

        return view(
            'common/job_summary/job_summary',
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
