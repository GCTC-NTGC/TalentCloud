<?php

namespace App\Policies;

use App\Models\Applicant;
use App\Models\User;
use App\Models\JobApplication;
use App\Models\ExperienceWork;
use App\Models\ExperienceEducation;
use App\Models\ExperiencePersonal;
use App\Models\ExperienceAward;
use App\Models\ExperienceCommunity;
use App\Policies\BasePolicy;
use Illuminate\Auth\Access\HandlesAuthorization;

class ExperiencePolicy extends BasePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the Experience object.
     * This includes all kinds of experience:
     * ExperienceWork, ExperienceAward, ExperiencePersonal, ExperienceCommunity and ExperienceEducation.
     *
     * @param  \App\Models\User  $user
     * @param  ExperienceWork|ExperienceEducation|ExperiencePersonal|ExperienceAward|ExperienceCommunity $experience
     * @return mixed
     */
    public function view(User $user, $experience)
    {
        // $experienceable is either an Applicant or a JobApplication
        $experienceable = $experience->experienceable;

        $authApplicant = $user->isApplicant() &&
            (($experienceable instanceof Applicant)
                ? $user->applicant->id === $experienceable->id
                : $user->applicant->id === $experienceable->applicant_id
            );

        $authManager = $user->isManager()
            && $experienceable instanceof JobApplication
            && $user->can('reviewApplicationsFor', $experienceable->job_poster);

        $authHr = $user->isHrAdvisor()
            && $experienceable instanceof JobApplication
            && $user->can('reviewApplicationsFor', $experienceable->job_poster);

        return $authApplicant || $authManager || $authHr;
    }

    /**
     * Determine whether the user can create Experience.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->isApplicant();
    }

    /**
     * Determine whether the user can update the Experience_____ object.
     *
     * @param  \App\Models\User  $user
     * @param  ExperienceWork|ExperienceEducation|ExperiencePersonal|ExperienceAward|ExperienceCommunity $experience
     * @return mixed
     */
    public function update(User $user, $experience)
    {
        // $experienceable is either an Applicant or a JobApplication
        $experienceable = $experience->experienceable;

        $authApplicant = ($experienceable instanceof Applicant)
            && $user->applicant->id === $experienceable->id;

        $authApplication = ($experienceable instanceof JobApplication)
            && $user->applicant->id === $experienceable->applicant_id
            && $experienceable->application_status->name == 'draft'
            && $experienceable->job_poster->isOpen();

        return $user->isApplicant() && ($authApplicant || $authApplication);
    }

    /**
     * Determine whether the user can delete the jobApplication.
     *
     * @param  \App\Models\User  $user
     * @param  ExperienceWork|ExperienceEducation|ExperiencePersonal|ExperienceAward|ExperienceCommunity $experience
     * @return mixed
     */
    public function delete(User $user, $experience)
    {
        // Permissions are the same for updating or deleting in this case.
        return $this->update($user, $experience);
    }
}
