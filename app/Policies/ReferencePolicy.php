<?php

namespace App\Policies;

use App\Models\Applicant;
use App\Models\User;
use App\Models\Reference;
use App\Policies\BasePolicy;

class ReferencePolicy extends BasePolicy
{

    /**
     * Determine whether the user can view the reference.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Reference  $reference
     * @return mixed
     */
    public function view(User $user, Reference $reference)
    {
        return $user->isApplicant()
            && $reference->referenceable instanceof Applicant
            && $reference->referenceable->user->is($user);
    }

    /**
     * Determine whether the user can create references.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return false;
    }

    /**
     * Determine whether the user can update the reference.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Reference  $reference
     * @return mixed
     */
    public function update(User $user, Reference $reference)
    {
        return false;
    }

    /**
     * Determine whether the user can delete the reference.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Reference  $reference
     * @return mixed
     */
    public function delete(User $user, Reference $reference)
    {
        return false;
    }
}
