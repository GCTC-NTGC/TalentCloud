<?php

namespace App\Policies;

use App\Models\User;
use App\Models\WorkExperience;
use App\Policies\BasePolicy;

class WorkExperiencePolicy extends BasePolicy
{

    /**
     * Determine whether the user can view the workExperience.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\WorkExperience  $workExperience
     * @return mixed
     */
    public function view(User $user, WorkExperience $workExperience)
    {
        return $user->hasRole('applicant') && $workExperience->applicant->user->is($user);
    }

    /**
     * Determine whether the user can create workExperiences.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->hasRole('applicant');
    }

    /**
     * Determine whether the user can update the workExperience.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\WorkExperience  $workExperience
     * @return mixed
     */
    public function update(User $user, WorkExperience $workExperience)
    {
        return $user->hasRole('applicant') && $workExperience->applicant->user->is($user);
    }

    /**
     * Determine whether the user can delete the workExperience.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\WorkExperience  $workExperience
     * @return mixed
     */
    public function delete(User $user, WorkExperience $workExperience)
    {
        return $user->hasRole('applicant') && $workExperience->applicant->user->is($user);
    }
}
