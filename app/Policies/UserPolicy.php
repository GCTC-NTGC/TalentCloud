<?php

namespace App\Policies;

use App\Models\User;
use App\Policies\BasePolicy;

class UserPolicy extends BasePolicy
{

    /**
     * Determine whether the user can view the target user.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $targetUser
     * @return mixed
     */
    public function view(User $user, User $targetUser)
    {
        return $user->id === $targetUser->id;
    }

    /**
     * Determine whether the user can create courses.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return false;
    }

    /**
     * Determine whether the user can update the target user.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $targetUser
     * @return mixed
     */
    public function update(User $user, User $targetUser)
    {
        return $user->id === $targetUser->id;
    }

    /**
     * Determine whether the user can delete the target user.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $targetUser
     * @return mixed
     */
    public function delete(User $user, User $targetUser)
    {
        return false;
    }
}
