<?php

namespace App\Policies;

use App\Models\ExperienceSkill;
use App\Models\User;
use App\Policies\BasePolicy;
use Illuminate\Auth\Access\HandlesAuthorization;

class ExperienceSkillPolicy extends BasePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the ExperienceSkill object.
     *
     * @param  \App\Models\User  $user
     * @param  ExperienceSkill $experienceSkill
     * @return mixed
     */
    public function view(User $user, $experienceSkill)
    {
        return $user->can('view', $experienceSkill->experience);
    }

    /**
     * Determine whether the user can create ExperienceSkill.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->isApplicant();
    }

    /**
     * Determine whether the user can update the ExperienceSkill object.
     *
     * @param  \App\Models\User  $user
     * @param  ExperienceSkill $experienceSkill
     * @return mixed
     */
    public function update(User $user, $experienceSkill)
    {
        return $user->can('update', $experienceSkill->experience);
    }

    /**
     * Determine whether the user can delete the ExperienceSkill.
     *
     * @param  \App\Models\User  $user
     * @param  ExperienceSkill $experienceSkill@return mixed
     */
    public function delete(User $user, $experienceSkill)
    {
        // Note that this only requires the user to have UPDATE permissions for the associated experience, not DELETE.
        return $user->can('update', $experienceSkill->experience);
    }
}
