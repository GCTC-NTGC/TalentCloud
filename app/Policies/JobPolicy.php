<?php

namespace App\Policies;

use App\Models\User;
use App\Models\JobPoster;
use App\Policies\BasePolicy;
use Illuminate\Support\Facades\Log;

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
        // Anyone can view a published job
        // Only the manager that created it can view an unpublished job
        // Hr Advisors can view all jobs.
        return $jobPoster->status() == 'published' || $jobPoster->status() == 'closed' ||
            ($user &&
                $user->isManager() &&
                $jobPoster->manager->user_id == $user->id) ||
            ($user &&
                $user->isHrAdvisor() &&
                $user->hr_advisor->department_id === $jobPoster->department_id &&
                $jobPoster->isVisibleToHr());
    }

    /**
     * Any user is permitted to request a list of jobs,
     * but only the jobs they are permitted to *view* should be returned.
     *
     * @return void
     */
    public function viewAny(?User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can create job posters.
     *
     * @param  \App\Models\User $user User to test against.
     * @return mixed
     */
    public function create(User $user)
    {
        // Any manager can create a new job poster.
        return $user->isManager();
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
        // Only managers can edit jobs, and only their own, managers can't publish jobs or edit published jobs
        return $user->isManager() &&
            $jobPoster->manager->user->id == $user->id &&
            !$jobPoster->published;
    }

    /**
     * Determine whether the user can delete the job poster.
     *
     * @param \App\Models\User      $user      User object making the request.
     * @param \App\Models\JobPoster $jobPoster Job Poster object being acted upon.
     *
     * @return boolean
     */
    public function delete(User $user, JobPoster $jobPoster): bool
    {
        // Jobs can only be deleted when they're in the 'draft'
        // state, and only by managers that created them.
        return $user->isManager() &&
            $jobPoster->manager->user->id == $user->id &&
            !$jobPoster->published;
    }

    /**
     * Determine whether the user can submit a job poster for review.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\JobPoster  $jobPoster
     * @return mixed
     */
    public function submitForReview(User $user, JobPoster $jobPoster)
    {
        // Only upgradedManagers can submit jobs for review, only their own jobs, and only if they're still drafts.
        // NOTE: this is one of the only permissions to require an upgradedManager, as opposed to a demoManager.
        return $user->isUpgradedManager() &&
            $jobPoster->manager->user->id == $user->id &&
            $jobPoster->status() === 'draft';
    }
    /**
     * Determine whether the user can review applications to the job poster.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\JobPoster  $jobPoster
     * @return mixed
     */
    public function reviewApplicationsFor(User $user, JobPoster $jobPoster)
    {
        // Only managers can review applications, and only for their own jobs.
        return $user->isManager() &&
            $jobPoster->manager->user->id == $user->id &&
            $jobPoster->isClosed();
    }

    /**
     * Determine whether the user can view the comments.
     *
     * @param \App\Models\User $user
     * @param \App\Models\JobPoster $jobPoster
     * @return bool
     */
    public function viewComments(User $user, JobPoster $jobPoster): bool
    {
        // Only the manager that created the job can view the comment.
        // Only Hr advisors who have claimed a job can view the comments.
        return ($user->isManager() && $jobPoster->manager->user->id == $user->id) ||
            ($user->isHrAdvisor()
                && $this->view($user, $jobPoster)
                && $user->hr_advisor->claimed_job_ids->includes($jobPoster->id));
    }

    /**
     * Determine whether the user can create a comment
     *
     * @param \App\Models\User $user User to test against
     * @param \App\Models\JobPoster $jobPoster
     * @return bool
     */
    public function storeComment(User $user, JobPoster $jobPoster): bool
    {
        // Only the manager that created the job can view the comment.
        // Only Hr advisors who have claimed a job can view the comments.
        return $this->viewComments($user, $jobPoster);
    }

    /**
     * Determine whether the user can 'claim' this job.
     *
     * @param User $user
     * @param JobPoster $jobPoster
     * @return boolean
     */
    public function claim(User $user, JobPoster $jobPoster): bool
    {
        return $user->isHrAdvisor() && $this->view($user, $jobPoster);
    }

    /**
     * Determine whether the user can 'unclaim' this job.
     *
     * @param User $user
     * @param JobPoster $jobPoster
     * @return boolean
     */
    public function unClaim(User $user, JobPoster $jobPoster): bool
    {
        return $this->claim($user, $jobPoster);
    }
}
