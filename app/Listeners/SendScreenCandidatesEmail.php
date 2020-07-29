<?php

namespace App\Listeners;

use App\Events\JobSaved;
use App\Mail\ScreenCandidatesPrompt;
use App\Models\Lookup\JobPosterStatus;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendScreenCandidatesEmail
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

        $assessment = JobPosterStatus::where('key', 'assessment')->first()->id;
        // If the job poster status has changed to 'assessment' then send email
        if ($job->isDirty('job_poster_status_id') && $job->job_poster_status_id == $assessment) {
            $manager_email = $job->manager->user->email;
            if (isset($manager_email)) {
                Mail::to($manager_email)->send(new ScreenCandidatesPrompt($job));
            } else {
                Log::error('The screen applicants email to manager has not been set.');
            }
        }
    }
}
