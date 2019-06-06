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
                $user->hasRole('manager') &&
                $jobPoster->manager_id == $user->manager->id
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
        //TODO: for now, only Admins can create posters. This will change soon.
        return $user->hasRole('admin');
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
     * Determine whether the user can review applications to the job poster.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\JobPoster  $jobPoster
     * @return mixed
     */
    public function review(User $user, JobPoster $jobPoster)
    {
        //Only managers can edit jobs, and only their own, managers can't publish jobs or edit published jobs
        return $user->user_role->name == 'manager' &&
            $jobPoster->manager->user->id == $user->id &&
            $jobPoster->isClosed();
    }


    /**
     * Determine whether the user can delete the job poster.
     *
     * @param \App\Models\User      $user      User object making the request.
     * @param \App\Models\JobPoster $jobPoster Job Poster object being acted upon.
     *
     * @return boolean
     */
    public function delete(User $user, JobPoster $jobPoster) : bool
    {
        // Jobs can only be deleted when they're in the 'draft'
        // state, and only by managers that created them.
        return $user->user_role->name == 'manager' &&
            $jobPoster->manager->user->id == $user->id &&
            !$jobPoster->published;
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
