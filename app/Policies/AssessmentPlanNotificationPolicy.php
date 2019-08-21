<?php

namespace App\Policies;

use App\Models\User;
use App\Models\AssessmentPlanNotification;
use App\Policies\BasePolicy;

class AssessmentPlanNotificationPolicy extends BasePolicy
{

    /**
     * Determine whether the user can view the AssessmentPlanNotification.
     *
     * @param  \App\Models\User       $user
     * @param  \App\Models\AssessmentPlanNotification $notification
     * @return boolean
     */
    public function view(User $user, AssessmentPlanNotification $notification): bool
    {
        // Managers can view notifications tied to Jobs they own.
        return $user->isManager() &&
            $notification->job_poster->manager->user_id === $user->id;
    }

    /**
     * Determine whether the user can create AssessmentPlanNotifications.
     *
     * @param  \App\Models\User $user
     * @return boolean
     */
    public function create(User $user): bool
    {
        //Any manager can create a new AssessmentPlanNotification, but only for job posters they own.
        return $user->isManager();
    }

    /**
     * Determine whether the user can update the AssessmentPlanNotification
     *
     * @param  \App\Models\User       $user
     * @param  \App\Models\AssessmentPlanNotification $notification
     * @return boolean
     */
    public function update(User $user, AssessmentPlanNotification $notification): bool
    {
        // Managers can edit notifications tied to Jobs they own.
        return $user->isManager() &&
            $notification->job_poster->manager->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the job poster.
     *
     * @param \App\Models\User       $user       User object making the request.
     * @param \App\Models\AssessmentPlanNotification $notification Job Poster object being acted upon.
     *
     * @return boolean
     */
    public function delete(User $user, AssessmentPlanNotification $notification) : bool
    {
        // Managers can delete notifications tied to Jobs they own.
        return $user->isManager() &&
            $notification->job_poster->manager->user_id === $user->id;
    }
}
