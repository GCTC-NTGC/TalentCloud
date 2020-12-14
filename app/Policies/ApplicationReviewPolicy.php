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
        $applicationReview->loadMissing('job_application.job_poster');
        return $user->can('reviewApplicationsFor', $applicationReview->job_application->job_poster);
    }
}
