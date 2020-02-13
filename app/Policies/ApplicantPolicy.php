<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Applicant;
use App\Models\JobPoster;
use App\Policies\BasePolicy;
use Illuminate\Support\Facades\Gate;

class ApplicantPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the applicant.
     *
     * @param  \App\Models\User      $user      User object making the view request.
     * @param  \App\Models\Applicant $applicant Applicant object to be viewed.
     * @return boolean
     */
    public function view(User $user, Applicant $applicant)
    {
        $authApplicant = $user->isApplicant() &&
            $applicant->user->is($user);
        $authManager = $user->isManager() && Gate::allows('owns-job-applicant-applied-to', $applicant);
        $authHr = $user->isHrAdvisor() && Gate::allows('claims-job-applicant-applied-to', $applicant);
        return $authApplicant || $authManager || $authHr;
    }

    /**
     * Determine whether the user can create applicants.
     *
     * @param  \App\Models\User $user User object making the create request.
     * @return boolean
     */
    public function create(User $user)
    {
        return false;
    }

    /**
     * Determine whether the user can update the applicant.
     *
     * @param  \App\Models\User      $user      User object making the update request.
     * @param  \App\Models\Applicant $applicant Applicant object being updated.
     * @return boolean
     */
    public function update(User $user, Applicant $applicant)
    {
        return $user->isApplicant() &&
            $applicant->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the applicant.
     *
     * @param  \App\Models\User      $user      User object making the delete request.
     * @param  \App\Models\Applicant $applicant Applicant object being deleted.
     * @return void
     */
    public function delete(User $user, Applicant $applicant)
    {
        return $user->isApplicant() &&
            $applicant->user_id === $user->id;
    }

    /**
     * Determine whether the user can restore the applicant.
     *
     * @param  \App\Models\User      $user      User object making the restore request.
     * @param  \App\Models\Applicant $applicant Applicant object being restored.
     * @return void
     */
    public function restore(User $user, Applicant $applicant)
    {
    }

    /**
     * Determine whether the user can permanently delete the applicant.
     *
     * @param  \App\Models\User      $user      User object making the forceDelete request.
     * @param  \App\Models\Applicant $applicant Applicant object being forceDeleted.
     * @return void
     */
    public function forceDelete(User $user, Applicant $applicant)
    {
    }
}
