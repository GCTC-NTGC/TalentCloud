<?php

namespace App\Listeners;

use App\Events\JobSaved;
use App\Models\JobPosterStatusHistory;
use App\Models\Lookup\JobPosterStatus;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RecordJobStatusTransition
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Handle the event.
     *
     * @param  JobSaved  $event
     * @return void
     */
    public function handle(JobSaved $event)
    {
        $job = $event->job;

        if ($job->isDirty('job_poster_status_id')) {
            $user = Auth::user();

            $fromStatusId = $job->getOriginal('job_poster_status_id');
            $toStatusId = $job->job_poster_status_id;

            if ($fromStatusId !== null) {
                // We don't need to save a transition history entry when the job is first created,
                // which is the only time from is null.
                $transition = new JobPosterStatusHistory();
                $transition->job_poster_id = $job->id;
                $transition->user_id = $user !== null ? $user->id : null;
                $transition->from_job_poster_status_id = $fromStatusId;
                $transition->to_job_poster_status_id = $toStatusId;
                $transition->save();

                $fromStatusKey = JobPosterStatus::find($fromStatusId)->key;
                $toStatusKey = JobPosterStatus::find($toStatusId)->key;
                Log::notice('Job status transition: job {id=' . $job->id . '} changed from ' . $fromStatusKey .
                    ' to ' . $toStatusKey . ' by user {id=' . $user->id . ', email=' . $user->email . '}');
            }
        }
    }
}
