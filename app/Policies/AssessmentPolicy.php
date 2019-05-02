<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Assessment;
use App\Policies\BasePolicy;

class AssessmentPolicy extends BasePolicy
{

    /**
     * Determine whether the user can view the Assessment.
     *
     * @param  \App\Models\User       $user
     * @param  \App\Models\Assessment $assessment
     * @return boolean
     */
    public function view(User $user, Assessment $assessment): bool
    {
        // Managers can view assessments tied to Jobs they own.
        return $user->hasRole('manager') &&
            $assessment->criterion->job_poster->manager->user_id === $user->id;
    }

    /**
     * Determine whether the user can create Assessments.
     *
     * @param  \App\Models\User $user
     * @return boolean
     */
    public function create(User $user): bool
    {
        //Any manager can create a new Assessment, but only for criteria they own.
        return $user->hasRole('manager');
    }

    /**
     * Determine whether the user can update the Assessment
     *
     * @param  \App\Models\User       $user
     * @param  \App\Models\Assessment $assessment
     * @return boolean
     */
    public function update(User $user, Assessment $assessment): bool
    {
        // Managers can edit assessments tied to Jobs they own.
        return $user->hasRole('manager') &&
            $assessment->criterion->job_poster->manager->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the job poster.
     *
     * @param \App\Models\User       $user       User object making the request.
     * @param \App\Models\Assessment $assessment Job Poster object being acted upon.
     *
     * @return boolean
     */
    public function delete(User $user, Assessment $assessment) : bool
    {
        // Managers can delete assessments tied to Jobs they own.
        return $user->hasRole('manager') &&
            $assessment->criterion->job_poster->manager->user_id === $user->id;
    }
}
