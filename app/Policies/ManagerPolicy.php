<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Manager;
use App\Policies\BasePolicy;

class ManagerPolicy extends BasePolicy
{

    /**
     * Determine whether the user can view the manager.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Manager  $manager
     * @return mixed
     */
    public function view(User $user, Manager $manager)
    {
        //Manager profiles are viewable by any logged-in user
        return $user != null;
    }

    /**
     * Determine whether the user can create managers.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return false;
    }

    /**
     * Determine whether the user can update the manager.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Manager  $manager
     * @return mixed
     */
    public function update(User $user, Manager $manager)
    {
        //Mangers can only update their own profiles
        return $user->isManager() &&
            $manager->user_id == $user->id;
    }

    /**
     * Determine whether the user can delete the manager.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Manager  $manager
     * @return mixed
     */
    public function delete(User $user, Manager $manager)
    {
        return false;
    }
}
