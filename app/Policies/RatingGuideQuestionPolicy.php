<?php

namespace App\Policies;

use App\Models\User;
use App\Models\RatingGuideQuestion;
use App\Policies\BasePolicy;

class RatingGuideQuestionPolicy extends BasePolicy
{

    /**
     * Determine whether the user can view the RatingGuideQuestion.
     *
     * @param  \App\Models\User                $user
     * @param  \App\Models\RatingGuideQuestion $question
     * @return boolean
     */
    public function view(User $user, RatingGuideQuestion $question): bool
    {
        // Managers can view questions tied to Jobs they own.
        return $user->isManager() &&
            $question->job_poster->manager->user_id === $user->id;
    }

    /**
     * Determine whether the user can create RatingGuideQuestions.
     *
     * @param  \App\Models\User $user
     * @return boolean
     */
    public function create(User $user): bool
    {
        // Any manager can create a new RatingGuideQuestion, but only for jobs they own.
        return $user->isManager();
    }

    /**
     * Determine whether the user can update the RatingGuideQuestion
     *
     * @param  \App\Models\User                $user
     * @param  \App\Models\RatingGuideQuestion $question
     * @return boolean
     */
    public function update(User $user, RatingGuideQuestion $question): bool
    {
        // Managers can edit questions tied to Jobs they own.
        return $user->isManager() &&
            $question->job_poster->manager->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the job poster.
     *
     * @param \App\Models\User                $user
     * @param \App\Models\RatingGuideQuestion $question
     *
     * @return boolean
     */
    public function delete(User $user, RatingGuideQuestion $question) : bool
    {
        // Managers can delete questions tied to Jobs they own.
        return $user->isManager() &&
            $question->job_poster->manager->user_id === $user->id;
    }
}
