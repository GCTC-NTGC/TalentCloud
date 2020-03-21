<?php

namespace App\Listeners;

use App\Events\JobSaved;
use App\Models\Lookup\JobPosterStatus;
use App\Services\JobPosterDefaultQuestions;

class JobPosterQuestionInitializer
{
    /**
     * When Job enters approved state, where an Admin must to a final look over,
     * ensure default questions are added.
     *
     * @param  JobSaved  $event
     * @return void
     */
    public function handle(JobSaved $event)
    {
        $job = $event->job;

        if ($job->isDirty('job_poster_status_id')) {
            $toStatusId = $job->job_poster_status_id;
            $approvedId = JobPosterStatus::where('key', 'approved')->first()->id;
            if ($toStatusId == $approvedId) {
                $defaultQuestionManager = new JobPosterDefaultQuestions();
                $defaultQuestionManager->initializeQuestionsIfEmpty($job);
            }
        }
    }
}
