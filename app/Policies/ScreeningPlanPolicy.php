<?php

namespace App\Policies;

use App\Models\User;
use App\Models\ScreeningPlan;

class ScreeningPlanPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the screeningPlan.
     * Only the manager for the corresponding job can view it.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ScreeningPlan  $screeningPlan
     * @return mixed
     */
    public function view(User $user, ScreeningPlan $screeningPlan)
    {
        return $user->hasRole('manager') &&
            $screeningPlan->job_poster->manager->user->is($user);
    }

    /**
     * Determine whether the user can create screeningPlans.
     * Any manager can create a screening plan for a job they own.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->hasRole('manager');
    }

    /**
     * Determine whether the user can update the screeningPlan.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ScreeningPlan  $screeningPlan
     * @return mixed
     */
    public function update(User $user, ScreeningPlan $screeningPlan)
    {
        return $user->hasRole('manager') &&
            $screeningPlan->job_poster->manager->user->is($user);
    }

    /**
     * Determine whether the user can delete the screeningPlan.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ScreeningPlan  $screeningPlan
     * @return mixed
     */
    public function delete(User $user, ScreeningPlan $screeningPlan)
    {
        return $user->hasRole('manager') &&
            $screeningPlan->job_poster->manager->user->is($user);
    }
}
