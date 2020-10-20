<?php

namespace App\Jobs;

use Jenssegers\Date\Date;
use App\Models\JobPoster;
use App\Models\Lookup\JobPosterStatus;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessJobStatusTransitions implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $now = Date::now();
        $ready = JobPosterStatus::where('key', 'ready')->first();
        $live = JobPosterStatus::where('key', 'live')->first();
        $assessment = JobPosterStatus::where('key', 'assessment')->first();

        $jobsReadyForLive = JobPoster::where('job_poster_status_id', $ready->id)
            ->where('open_date_time', '<=', $now)->get();

        // We want to call save on each model individually instead of doing a mass update in order to trigger
        // any events that may be listening for eloquent model updates.
        foreach ($jobsReadyForLive as $job) {
            $job->job_poster_status_id = $live->id;
            $job->save();
        }

        $jobsReadyForAssessment = JobPoster::where('job_poster_status_id', $live->id)
            ->where('close_date_time', '<=', $now)->get();
        foreach ($jobsReadyForAssessment as $job) {
            $job->job_poster_status_id = $assessment->id;
            $job->save();
        }
    }
}
