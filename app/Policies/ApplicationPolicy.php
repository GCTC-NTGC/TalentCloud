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
     * @param  \App\JobApplication  $application
     * @return mixed
     */
    public function view(User $user, JobApplication $application)
    {
        $authApplicant = ($user->isApplicant() &&
            $user->applicant->id === $application->applicant_id);
        $authManager = $user->isManager()
            && $user->can('reviewApplicationsFor', $application->job_poster);
        $authHr = $user->isHrAdvisor()
            && $user->can('reviewApplicationsFor', $application->job_poster);

        return $authApplicant || $authManager || $authHr;
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
     * Determine whether the user can update the application.
     *
     * @param  \App\Models\User  $user
     * @param  \App\JobApplication  $application
     * @return mixed
     */
    public function update(User $user, JobApplication $application)
    {
        return $user->isApplicant() &&
            $user->applicant->id === $application->applicant_id &&
            $application->application_status->name == 'draft' &&
            $application->job_poster->isOpen();
    }

    /**
     * Determine whether the user can delete the application.
     *
     * @param  \App\Models\User  $user
     * @param  \App\JobApplication  $application
     * @return mixed
     */
    public function delete(User $user, JobApplication $application)
    {
        return $user->isApplicant() &&
            $user->applicant->id === $application->applicant_id &&
            $application->application_status->name == 'draft';
    }

    /**
     * Determine whether the user can review the application.
     *
     * @param  \App\Models\User  $user
     * @param  \App\JobApplication  $application
     * @return mixed
     */
    public function review(User $user, JobApplication $application)
    {
        // Only the manager in charge of the accompanying job can review an application,
        // and only if it has been submitted
        $authManager = $user->isManager() &&
            $application->job_poster->manager->user->id == $user->id;
        $authHr = $user->isHrAdvisor() && $user->can('manage', $application->job_poster);
        return !$application->isDraft() && ($authManager || $authHr);
    }
}
