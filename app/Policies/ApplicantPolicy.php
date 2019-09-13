<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Applicant;
use App\Models\JobPoster;
use App\Policies\BasePolicy;

class ApplicantPolicy extends BasePolicy
{

    /**
     * Returns true if $user owns a job to which $applicant has applied.
     *
     * @param  \App\Models\User      $user      Generic User object for checking Manager relationship to Job Poster.
     * @param  \App\Models\Applicant $applicant Applicant object used within applications submitted to Job Poster.
     * @return boolean
     */
    protected function ownsJobApplicantAppliedTo(User $user, Applicant $applicant)
    {
        $applicant_id = $applicant->id;
        $user_id = $user->id;
        return JobPoster::whereHas(
            'manager',
            function ($q) use ($user_id) {
                $q->where('user_id', $user_id);
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
     * @param  \App\Models\User      $user      User object making the view request.
     * @param  \App\Models\Applicant $applicant Applicant object to be viewed.
     * @return boolean
     */
    public function view(User $user, Applicant $applicant)
    {
        $authApplicant =  $user->isApplicant() &&
            $applicant->user->is($user);
        $authManager = $user->isManager() && $this->ownsJobApplicantAppliedTo($user, $applicant);
        return $authApplicant || $authManager;
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
