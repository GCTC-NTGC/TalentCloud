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
     * @param \App\Models\?User     $user      User object making the request.
     * @param \App\Models\JobPoster $jobPoster Job Poster object being acted upon.
     * @return mixed
     */
    public function view(?User $user, JobPoster $jobPoster)
    {
        // Anyone can view a published job past the open date
        // Managers can always view jobs they created.
        // Hr Advisors can view all jobs in their department.
        return $jobPoster->isPublic() ||
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
     * @param \App\Models\?User $user User object making the request.
     * @return boolean
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
     * @param \App\Models\User      $user      User object making the request.
     * @param \App\Models\JobPoster $jobPoster Job Poster object being acted upon.
     * @return mixed
     */
    public function update(User $user, JobPoster $jobPoster)
    {
        // Only managers can edit jobs, and only their own, managers can't publish jobs or edit published jobs.
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
     * Determine whether the user can review applications to the job poster.
     *
     * @param \App\Models\User      $user      User object making the request.
     * @param \App\Models\JobPoster $jobPoster Job Poster object being acted upon.
     * @return mixed
     */
    public function reviewApplicationsFor(User $user, JobPoster $jobPoster)
    {
        // Managers can only review applications their own jobs.
        // HR Advisors can review applications for jobs they manage.
        // The job must always be closed.
        $authManager = $user->isManager() && $jobPoster->manager->user->id == $user->id;
        $authHr = $user->isHrAdvisor() && $this->manage($user, $jobPoster);

        return $jobPoster->isClosed() && ($authManager || $authHr);
    }

    /**
     * Determine whether the user is a Manager or an HR Advisor with permission to manage this job.
     *
     * @param \App\Models\User      $user      User object making the request.
     * @param \App\Models\JobPoster $jobPoster Job Poster object being acted upon.
     * @return boolean
     */
    public function manage(User $user, JobPoster $jobPoster)
    {
        return ($user->isManager() &&
            $jobPoster->manager->user->id == $user->id) ||
            ($user->isHrAdvisor()
                && $this->view($user, $jobPoster)
                && $user->hr_advisor->claimed_job_ids->contains($jobPoster->id));
    }

    /**
     * Determine whether the user can view the comments.
     *
     * @param \App\Models\User      $user      User object making the request.
     * @param \App\Models\JobPoster $jobPoster Job Poster object being acted upon.
     * @return boolean
     */
    public function viewComments(User $user, JobPoster $jobPoster): bool
    {
        // Only the manager that created the job can view the comment.
        // Only Hr advisors who have claimed a job can view the comments.
        return $this->manage($user, $jobPoster);
    }

    /**
     * Determine whether the user can create a comment
     *
     * @param \App\Models\User      $user      User object making the request.
     * @param \App\Models\JobPoster $jobPoster Job Poster object being acted upon.
     * @return boolean
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
     * @param \App\Models\User      $user      User object making the request.
     * @param \App\Models\JobPoster $jobPoster Job Poster object being acted upon.
     * @return boolean
     */
    public function claim(User $user, JobPoster $jobPoster): bool
    {
        return $user->isHrAdvisor() && $this->view($user, $jobPoster);
    }

    /**
     * Determine whether the user can 'unclaim' this job.
     *
     * @param \App\Models\User      $user      User object making the request.
     * @param \App\Models\JobPoster $jobPoster Job Poster object being acted upon.
     * @return boolean
     */
    public function unClaim(User $user, JobPoster $jobPoster): bool
    {
        return $this->claim($user, $jobPoster);
    }

    /**
     * Determine whether the user can view assessment plan.
     *
     * @param \App\Models\User      $user      User object making the request.
     * @param \App\Models\JobPoster $jobPoster Job Poster object being acted upon.
     * @return boolean
     */
    public function viewAssessmentPlan(User $user, JobPoster $jobPoster): bool
    {
        return $user->isAdmin() ||
            $user->isManager() && $jobPoster->manager->user_id === $user->id ||
            $user->isHrAdvisor() && $jobPoster->hr_advisors->contains('user_id', $user->id);
    }

    /**
     * Determine whether the user can download CSV file of applicants who have applied to job.
     *
     * @param \App\Models\User      $user      User object making the request.
     * @param \App\Models\JobPoster $jobPoster Job Poster object being acted upon.
     * @return boolean
     */
    public function downloadApplicants(User $user, JobPoster $jobPoster): bool
    {
        return $user->isAdmin() && $jobPoster->isPublic();
    }
}
