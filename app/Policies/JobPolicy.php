<?php

namespace App\Policies;

use App\Models\User;
use App\Models\JobPoster;
use App\Policies\BasePolicy;

class JobPolicy extends BasePolicy
{

    /**
     * Determine whether the user can view the job poster.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\JobPoster  $jobPoster
     * @return mixed
     */
    public function view(?User $user, JobPoster $jobPoster)
    {
        //Anyone can view a published job
        //Only the manager that created it can view an unpublished job
        return $jobPoster->published ||
            (
                $user &&
                $jobPoster->manager->user->id == $user->id
            );
    }

    /**
     * Determine whether the user can create job posters.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //Any manager can create a new job poster
        return $user->user_role->name == 'manager';
    }

    /**
     * Determine whether the user can update the job poster.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\JobPoster  $jobPoster
     * @return mixed
     */
    public function update(User $user, JobPoster $jobPoster)
    {
        //Only managers can edit jobs, and only their own, managers can't publish jobs or edit published jobs
        return $user->user_role->name == 'manager' &&
            $jobPoster->manager->user->id == $user->id &&
            !$jobPoster->published;
    }

    /**
     * Determine whether the user can delete the job poster.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\JobPoster  $jobPoster
     * @return mixed
     */
    public function delete(User $user, JobPoster $jobPoster)
    {
        //
    }

    /**
     * Determine whether the user can restore the job poster.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\JobPoster  $jobPoster
     * @return mixed
     */
    public function restore(User $user, JobPoster $jobPoster)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the job poster.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\JobPoster  $jobPoster
     * @return mixed
     */
    public function forceDelete(User $user, JobPoster $jobPoster)
    {
        //
    }
}
