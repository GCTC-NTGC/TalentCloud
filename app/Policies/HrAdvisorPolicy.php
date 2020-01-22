<?php

namespace App\Policies;

use App\Models\HrAdvisor;
use App\Models\User;

class HrAdvisorPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the HrAdvisor.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\HrAdvisor  $hrAdvisor
     * @return mixed
     */
    public function view(User $user, HrAdvisor $hrAdvisor)
    {
        return $user->isHrAdvisor() && $hrAdvisor->user_id === $user->id;
    }

    public function update(User $user, HrAdvisor $hrAdvisor)
    {
        return $user->isHrAdvisor() && $hrAdvisor->user_id === $user->id;
    }
}
