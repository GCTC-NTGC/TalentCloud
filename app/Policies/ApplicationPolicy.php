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
        $authApplicant = ($user->user_role->name === "applicant" &&
            $user->applicant->id === $jobApplication->applicant_id);
        $authManager = ($user->hasRole('manager') &&
            $jobApplication->job_poster->manager->user->is($user));

        return $authApplicant||$authManager;
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
        return $user->user_role->name === "applicant" &&
            $user->applicant->id === $jobApplication->applicant_id &&
            $jobApplication->application_status->name == "draft" &&
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
        return $user->user_role->name === "applicant" &&
            $user->applicant->id === $jobApplication->applicant_id &&
            $jobApplication->application_status->name == "draft";
    }
}
