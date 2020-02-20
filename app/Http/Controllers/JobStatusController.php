<?php

namespace App\Http\Controllers;

use App\Exceptions\StateMachineException;
use App\Models\JobPoster;
use App\Http\Resources\JobPoster as JobPosterResource;
use App\Models\JobPosterStatusHistory;
use App\Models\Lookup\JobPosterStatus;
use App\Services\JobStatusTransitions;
use Illuminate\Http\Request;

class JobStatusController extends Controller
{
    protected function transitionJobStatus(Request $request, JobPoster $job, string $to)
    {
        $transitions = new JobStatusTransitions();

        $user = $request->user();
        $fromStatus = $job->job_poster_status;
        $from = $fromStatus->name;

        // Ensure state transition is legal.
        if (!$transitions->canTransition($user, $from, $to)) {
            throw new StateMachineException('Illegal state transition');
        }

        // Save new status on job.
        $toStatus = JobPosterStatus::where('name', $to)->first();
        $job->job_poster_status_id = $toStatus->id;
        $job->save();

        // Save transition history.
        $transition = new JobPosterStatusHistory();
        $transition->job_poster_id = $job->id;
        $transition->user_id = $user->id;
        $transition->from_job_poster_status_id = $fromStatus->id;
        $transition->to_job_poster_status_id = $toStatus->id;
        $transition->save();

        return $request->ajax()
            ? new JobPosterResource($job->fresh())
            : back();
    }

    public function setJobStatus(Request $request, JobPoster $jobPoster, string $status)
    {
        // $status = $request->input('status');
        return $this->transitionJobStatus($request, $jobPoster, $status);
    }
}
