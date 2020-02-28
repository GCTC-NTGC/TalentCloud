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
use Illuminate\Support\Facades\Log;

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
        $published = JobPosterStatus::where('key', 'published')->first();
        $completed = JobPosterStatus::where('key', 'completed')->first();
        $jobsReadyForClose = JobPoster::where('job_poster_status_id', $published->id)
            ->where('close_date_time', '<=', $now)->get();
        foreach ($jobsReadyForClose as $job) {
            $job->job_poster_status_id = $completed->id;
            $job->save();
        }
    }
}
