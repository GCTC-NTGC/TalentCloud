<?php

namespace App\Policies;

use App\Models\User;
use App\Models\ApplicationReview;
use App\Policies\BasePolicy;
use Illuminate\Auth\Access\HandlesAuthorization;

class ApplicationReviewPolicy extends BasePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the Application Review.
     *
     * @param  User  $user
     * @param  ApplicationReview  $applicationReview
     * @return mixed
     */
    public function update(User $user, ApplicationReview $applicationReview)
    {
        $user->loadMissing('manager');
        // TODO: Is there business logic around who can update/create application reviews?
        // Does it need to be the manager who created the Job Poster, or can it be any manager/HR advisor?
        // $applicationReview->loadMissing('job_application.job_poster.manager');
        // return $user->isUpgradedManager() &&
        //     $applicationReview->job_application->job_poster->manager->id === $user->manager->id;
        return $user->isUpgradedManager();
    }
}
