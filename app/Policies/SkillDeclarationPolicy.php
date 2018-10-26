<?php

namespace App\Policies;

use App\Models\User;
use App\Models\SkillDeclaration;
use App\Policies\BasePolicy;

class SkillDeclarationPolicy extends BasePolicy
{

    /**
     * Determine whether the user can view the skillDeclaration.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\SkillDeclaration  $skillDeclaration
     * @return mixed
     */
    public function view(User $user, SkillDeclaration $skillDeclaration)
    {
        return ($user->hasRole('applicant') && $skillDeclaration->applicant->user->is($user));
    }

    /**
     * Determine whether the user can create skillDeclarations.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->hasRole('applicant');
    }

    /**
     * Determine whether the user can update the skillDeclaration.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\SkillDeclaration  $skillDeclaration
     * @return mixed
     */
    public function update(User $user, SkillDeclaration $skillDeclaration)
    {
        return ($user->hasRole('applicant') && $skillDeclaration->applicant->user->is($user));
    }

    /**
     * Determine whether the user can delete the skillDeclaration.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\SkillDeclaration  $skillDeclaration
     * @return mixed
     */
    public function delete(User $user, SkillDeclaration $skillDeclaration)
    {
        return ($user->hasRole('applicant') && $skillDeclaration->applicant->user->is($user));
    }
}
