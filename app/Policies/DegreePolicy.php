<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Degree;
use App\Policies\BasePolicy;

class DegreePolicy extends BasePolicy
{

    /**
     * Determine whether the user can view the degree.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Degree  $degree
     * @return mixed
     */
    public function view(User $user, Degree $degree)
    {
        return $user->isApplicant() && $degree->applicant->user->is($user);
    }

    /**
     * Determine whether the user can create degrees.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->isApplicant();
    }

    /**
     * Determine whether the user can update the degree.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Degree  $degree
     * @return mixed
     */
    public function update(User $user, Degree $degree)
    {
        return $user->isApplicant() && $degree->applicant->user->is($user);
    }

    /**
     * Determine whether the user can delete the degree.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Degree  $degree
     * @return mixed
     */
    public function delete(User $user, Degree $degree)
    {
        return $user->isApplicant() && $degree->applicant->user->is($user);
    }
}
