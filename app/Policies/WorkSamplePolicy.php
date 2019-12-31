<?php

namespace App\Policies;

use App\Models\Applicant;
use App\Models\User;
use App\Models\WorkSample;
use App\Policies\BasePolicy;

class WorkSamplePolicy extends BasePolicy
{

    /**
     * Determine whether the user can view the workSample.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\WorkSample  $workSample
     * @return mixed
     */
    public function view(User $user, WorkSample $workSample)
    {
        return $user->isApplicant()
            && $workSample->work_sampleable instanceof Applicant
            && $workSample->work_sampleable->user->is($user);
    }

    /**
     * Determine whether the user can create workSamples.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->isApplicant();
    }

    /**
     * Determine whether the user can update the workSample.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\WorkSample  $workSample
     * @return mixed
     */
    public function update(User $user, WorkSample $workSample)
    {
        return $user->isApplicant()
            && $workSample->work_sampleable instanceof Applicant
            && $workSample->work_sampleable->user->is($user);
    }

    /**
     * Determine whether the user can delete the workSample.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\WorkSample  $workSample
     * @return mixed
     */
    public function delete(User $user, WorkSample $workSample)
    {
        return $user->isApplicant()
            && $workSample->work_sampleable instanceof Applicant
            && $workSample->work_sampleable->user->is($user);
    }
}
