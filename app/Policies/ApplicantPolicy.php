<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Manager;
use App\Models\Applicant;
use App\Models\JobPoster;
use App\Policies\BasePolicy;

class ApplicantPolicy extends BasePolicy
{

    /**
     * Returns true if $manager owns a job to which $applicant has applied
     * @param  Manager   $manager   [description]
     * @param  Applicant $applicant [description]
     * @return [type]               [description]
     */
    protected function ownsJobApplcantAppliedTo(User $user, Applicant $applicant)
    {
        $applicant_id = $applicant->id;
        $userId = $user->id;
        return JobPoster::whereHas(
            'manager',
            function ($q) use ($userId) {
                $q->where('user_id', $userId);
            }
        )->whereHas(
            'submitted_applications',
            function ($q) use ($applicant_id) {
                    $q->where('applicant_id', $applicant_id);
            }
        )->get()->isNotEmpty();
    }

    /**
     * Determine whether the user can view the applicant.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Applicant  $applicant
     * @return mixed
     */
    public function view(User $user, Applicant $applicant)
    {
        $authApplicant =  $user->isApplicant() &&
            $applicant->user->is($user);
        $authManager = $user->isManager() && $this->ownsJobApplcantAppliedTo($user, $applicant);
        return $authApplicant || $authManager;
    }

    /**
     * Determine whether the user can create applicants.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return false;
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
        return $user->isApplicant() &&
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
    }
}
