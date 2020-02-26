<?php

namespace App\Http\Controllers;

use App\Exceptions\StateMachineException;
use App\Models\JobPoster;
use App\Http\Resources\JobPoster as JobPosterResource;
use App\Models\Lookup\JobPosterStatus;
use App\Services\JobStatusTransitionManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;

class JobStatusController extends Controller
{
    protected function transitionJobStatus(Request $request, JobPoster $job, string $to)
    {
        $transitionManager = new JobStatusTransitionManager();

        $user = $request->user();
        $fromStatus = $job->job_poster_status;
        $from = $fromStatus->key;

        // Ensure state transition is legal.
        if (!$transitionManager->isLegalTransition($from, $to)) {
            throw new StateMachineException(Lang::get('errors.illegal_status_transition', [
                'from' => $from,
                'to' => $to,
            ]));
        } elseif (!$transitionManager->userCanTransition($user, $from, $to)) {
            throw new StateMachineException(Lang::get('errors.user_must_own_status'));
        }

        // Save new status on job.
        $toStatus = JobPosterStatus::where('key', $to)->first();
        $job->job_poster_status_id = $toStatus->id;
        $job->save();

        return ($request->ajax() || $request->wantsJson())
            ? new JobPosterResource($job->fresh())
            : back();
    }

    public function setJobStatus(Request $request, JobPoster $jobPoster, string $status)
    {
        // $status = $request->input('status');
        return $this->transitionJobStatus($request, $jobPoster, $status);
    }
}
