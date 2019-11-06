<?php

namespace App\Listeners;

use App\Events\JobSaved;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class JobPublished
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

        // If job has just been created, log if its being published now
        // If job is being modified, only want to log when it goes from unpublished to published
        if (($job->wasRecentlyCreated && $job->published) ||
                (!$job->wasRecentlyCreated && $job->published && !$job->getOriginal('published'))) {
            Log::notice('Job published: job {id='.$job->id.'} published by manager {id='.$job->manager->id.', email='.$job->manager->user->email.'}');
        }
    }
}
