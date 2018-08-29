<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Applicant;
use App\Policies\BasePolicy;
use Barryvdh\Debugbar\Facade as Debugbar;

class ApplicantPolicy extends BasePolicy
{

    /**
     * Determine whether the user can view the applicant.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Applicant  $applicant
     * @return mixed
     */
    public function view(User $user, Applicant $applicant)
    {
        return $user->user_role->name === "applicant" &&
            $applicant->user_id === $user->id;
    }

    /**
     * Determine whether the user can create applicants.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the applicant.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Applicant  $applicant
     * @return mixed
     */
    public function update(User $user, Applicant $applicant)
    {
        return $user->user_role->name === "applicant" &&
            $applicant->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the applicant.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Applicant  $applicant
     * @return mixed
     */
    public function delete(User $user, Applicant $applicant)
    {
        //
    }

    /**
     * Determine whether the user can restore the applicant.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Applicant  $applicant
     * @return mixed
     */
    public function restore(User $user, Applicant $applicant)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the applicant.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Applicant  $applicant
     * @return mixed
     */
    public function forceDelete(User $user, Applicant $applicant)
    {
        //
    }
}
