<?php

namespace App\Policies;

use App\Models\User;
use App\Models\JobApplication;
use App\Policies\BasePolicy;
use Illuminate\Auth\Access\HandlesAuthorization;

class ApplicationPolicy extends BasePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the jobApplication.
     *
     * @param  \App\Models\User  $user
     * @param  \App\JobApplication  $jobApplication
     * @return mixed
     */
    public function view(User $user, JobApplication $jobApplication)
    {
        $authApplicant = ($user->isApplicant() &&
            $user->applicant->id === $jobApplication->applicant_id);
        $authManager = ($user->isManager() &&
            $jobApplication->job_poster->manager->user->is($user));

        return $authApplicant || $authManager;
    }

    /**
     * Determine whether the user can create jobApplications.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the jobApplication.
     *
     * @param  \App\Models\User  $user
     * @param  \App\JobApplication  $jobApplication
     * @return mixed
     */
    public function update(User $user, JobApplication $jobApplication)
    {
        return $user->isApplicant() &&
            $user->applicant->id === $jobApplication->applicant_id &&
            $jobApplication->application_status->name == 'draft' &&
            $jobApplication->job_poster->isOpen();
    }

    /**
     * Determine whether the user can delete the jobApplication.
     *
     * @param  \App\Models\User  $user
     * @param  \App\JobApplication  $jobApplication
     * @return mixed
     */
    public function delete(User $user, JobApplication $jobApplication)
    {
        return $user->isApplicant() &&
            $user->applicant->id === $jobApplication->applicant_id &&
            $jobApplication->application_status->name == 'draft';
    }

    /**
     * Determine whether the user can review the jobApplication.
     *
     * @param  \App\Models\User  $user
     * @param  \App\JobApplication  $jobApplication
     * @return mixed
     */
    public function review(User $user, JobApplication $jobApplication)
    {
        // Only the manager in charge of the accompanying job can review an application,
        // and only if it has been submitted
        return $user->isManager() &&
            $jobApplication->job_poster->manager->user->id == $user->id &&
            $jobApplication->application_status->name != 'draft';
    }
}
