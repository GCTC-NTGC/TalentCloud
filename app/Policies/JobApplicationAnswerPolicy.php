<?php

namespace App\Policies;

use App\Models\JobApplicationAnswer;
use App\Models\User;
use App\Policies\BasePolicy;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Log;

class JobApplicationAnswerPolicy extends BasePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can create JobApplicationAnswer.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->isApplicant();
    }

    /**
     * Determine whether the user can update the JobApplicationAnswer object.
     *
     * @param  \App\Models\User  $user
     * @param  JobApplicationAnswer $jobApplicationAnswer
     * @return mixed
     */
    public function update(User $user, JobApplicationAnswer $jobApplicationAnswer)
    {
        return $user->can('update', $jobApplicationAnswer->job_application);
    }
}
