<?php

namespace App\Services;

use App\Models\JobPoster;
use App\Models\JobPosterQuestion;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;

class JobPosterDefaultQuestions
{
    /**
     * Get the localized default questions and add them to an array.
     *
     * @return mixed[]|void
     */
    public function createDefaultQuestions(bool $isStrategicResponseJob = false)
    {

        $question_key = $isStrategicResponseJob
            ? 'strategic_response_questions'
            : 'questions';

        $defaultQuestions = [
            'en' => array_values(Lang::get('manager/job_create', [], 'en')[$question_key]),
            'fr' => array_values(Lang::get('manager/job_create', [], 'fr')[$question_key]),
        ];

        if (count($defaultQuestions['en']) !== count($defaultQuestions['fr'])) {
            Log::warning('There must be the same number of French and English default questions for a Job Poster.');
            return;
        }

        $jobQuestions = [];

        for ($i = 0; $i < count($defaultQuestions['en']); $i++) {
            $jobQuestion = new JobPosterQuestion();
            $jobQuestion->fill(
                [
                    'question' => [
                        'en' => $defaultQuestions['en'][$i],
                        'fr' => $defaultQuestions['fr'][$i],
                    ]
                ]
            );
            $jobQuestions[] = $jobQuestion;
        }

        return $jobQuestions;
    }

    public function initializeQuestionsIfEmpty(JobPoster $jobPoster)
    {
        if ($jobPoster->job_poster_questions === null || $jobPoster->job_poster_questions->count() === 0) {
            $questions = $this->createDefaultQuestions($jobPoster->isInStrategicResponseDepartment());
            $jobPoster->job_poster_questions()->saveMany($questions);
            $jobPoster->refresh();
        }
    }
}
