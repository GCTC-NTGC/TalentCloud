<?php

namespace App\Policies;

use App\Models\User;
use App\Models\RatingGuideAnswer;
use App\Policies\BasePolicy;

class RatingGuideAnswerPolicy extends BasePolicy
{

    /**
     * Determine whether the user can view the RatingGuideAnswer.
     *
     * @param  \App\Models\User              $user
     * @param  \App\Models\RatingGuideAnswer $answer
     * @return boolean
     */
    public function view(User $user, RatingGuideAnswer $answer): bool
    {
        // Managers can view answers tied to Jobs they own.
        return $user->isManager() &&
            $answer->rating_guide_question->job_poster->manager->user_id === $user->id;
    }

    /**
     * Determine whether the user can create RatingGuideAnswers.
     *
     * @param  \App\Models\User $user
     * @return boolean
     */
    public function create(User $user): bool
    {
        // Any manager can create a new RatingGuideAnswer, but only for questions they own.
        return $user->isManager();
    }

    /**
     * Determine whether the user can update the RatingGuideAnswer
     *
     * @param  \App\Models\User              $user
     * @param  \App\Models\RatingGuideAnswer $answer
     * @return boolean
     */
    public function update(User $user, RatingGuideAnswer $answer): bool
    {
        // Managers can edit answers tied to Jobs they own.
        return $user->isManager() &&
            $answer->rating_guide_question->job_poster->manager->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the job poster.
     *
     * @param \App\Models\User              $user
     * @param \App\Models\RatingGuideAnswer $answer
     *
     * @return boolean
     */
    public function delete(User $user, RatingGuideAnswer $answer) : bool
    {
        // Managers can delete answers tied to Jobs they own.
        return $user->isManager() &&
            $answer->rating_guide_question->job_poster->manager->user_id === $user->id;
    }
}
