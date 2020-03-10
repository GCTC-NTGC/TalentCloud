<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\Applicant;
use App\Models\Course;
use App\Models\Degree;
use App\Models\Manager;
use App\Models\JobPoster;
use App\Models\Reference;
use App\Models\WorkSample;
use App\Models\JobApplication;
use App\Models\WorkExperience;
use App\Models\SkillDeclaration;
use App\Models\Assessment;
use App\Models\RatingGuideQuestion;
use App\Models\RatingGuideAnswer;
use App\Models\AssessmentPlanNotification;
use App\Models\HrAdvisor;
use App\Models\User;
use App\Policies\UserPolicy;
use App\Policies\JobPolicy;
use App\Policies\CoursePolicy;
use App\Policies\DegreePolicy;
use App\Policies\ManagerPolicy;
use App\Policies\ApplicantPolicy;
use App\Policies\ReferencePolicy;
use App\Policies\ApplicationPolicy;
use App\Policies\SkillDeclarationPolicy;
use App\Policies\WorkExperiencePolicy;
use App\Policies\WorkSamplePolicy;
use App\Policies\AssessmentPolicy;
use App\Policies\RatingGuideQuestionPolicy;
use App\Policies\RatingGuideAnswerPolicy;
use App\Policies\AssessmentPlanNotificationPolicy;
use App\Policies\HrAdvisorPolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        User::class => UserPolicy::class,
        Applicant::class => ApplicantPolicy::class,
        Manager::class => ManagerPolicy::class,
        JobPoster::class => JobPolicy::class,
        JobApplication::class => ApplicationPolicy::class,
        Course::class => CoursePolicy::class,
        Degree::class => DegreePolicy::class,
        Reference::class => ReferencePolicy::class,
        SkillDeclaration::class => SkillDeclarationPolicy::class,
        WorkExperience::class => WorkExperiencePolicy::class,
        WorkSample::class => WorkSamplePolicy::class,
        Assessment::class => AssessmentPolicy::class,
        RatingGuideQuestion::class => RatingGuideQuestionPolicy::class,
        RatingGuideAnswer::class => RatingGuideAnswerPolicy::class,
        AssessmentPlanNotification::class =>  AssessmentPlanNotificationPolicy::class,
        HrAdvisor::class => HrAdvisorPolicy::class,
    ];

    /**
     * Define any authorization gates
     *
     * @return void
     */
    protected function defineGates(): void
    {
        Gate::define('view-assessment-plan', function ($user, $jobPoster) {
            return $user->isAdmin() ||
                $user->isManager() && $jobPoster->manager->user_id === $user->id;
        });

        /*
         * Returns true if $user owns a job to which $applicant has applied.
         */
        Gate::define('owns-job-applicant-applied-to', function ($user, $applicant) {
            $applicant_id = $applicant->id;
            $user_id = $user->id;
            return JobPoster::whereHas(
                'manager',
                function ($q) use ($user_id): void {
                    $q->where('user_id', $user_id);
                }
            )->whereHas(
                'submitted_applications',
                function ($q) use ($applicant_id): void {
                    $q->where('applicant_id', $applicant_id);
                }
            )->get()->isNotEmpty();
        });

        /*
         * Returns true if the $user is an hr_advisor which has claimed a job the applicant has applied to,
         * where the job is closed.
         */
        Gate::define('claims-job-applicant-applied-to', function ($user, $applicant) {
            if ($user->isHrAdvisor()) {
                return $applicant->submitted_applications->some(function ($application) use ($user) {
                    return $user->can('manage', $application->job_poster) && $application->job_poster->isClosed();
                });
            }
            return false;
        });

        /* Logged-in Users can view themselves. Admins can view everyone. Managers can view
         * Applicants of their Job Posters. HR Advisors can view Managers
         * within their department, and any Applicants of Job Posters created
         * by those managers.
         */

        /* TODO: User roles/permissions are getting a little unruly. I needed to add an
         * additional check alongside isUpgradedManager() because we have an isAdmin()
         * passthrough on that method, which was causing issues on the hr_advisor/manager
         * reference.
         */
        Gate::define('view-user', function ($user, $userProfile) {
            return (
                // Any user can view themselves.
                $user->id === $userProfile->id) ||
                (
                    // Admins can view anyone.
                    $user->isAdmin()) ||
                (
                    // Managers should be able to view HR Advisors within their department.
                    $user->isUpgradedManager() && ($user->manager !== null)
                    && !$user->isAdmin()
                    && $userProfile->isHrAdvisor() && ($userProfile->hr_advisor !== null)
                    && !$userProfile->isAdmin()
                    && ($user->manager->department_id === $userProfile->hr_advisor->department_id)) ||
                (
                    // HR Advisors can view applicants that have applied to Job Posters that have been claimed.
                    ($user->isHrAdvisor() && $userProfile->applicant !== null) &&
                    Gate::forUser($user)->allows('claims-job-applicant-applied-to', $userProfile->applicant)) ||
                (
                    // Managers can view Applicants who have applied to their Job Posters.
                    (!$user->isAdmin() && $user->isUpgradedManager() && $userProfile->applicant !== null) &&
                    Gate::forUser($user)->allows('owns-job-applicant-applied-to', $userProfile->applicant)) ||
                (
                    // Manager profiles are viewable by any logged in User.
                    $user !== null && !$userProfile->isAdmin() && $userProfile->isUpgradedManager());
        });

        Gate::define('view-resources', function ($user) {
            return $user->isUpgradedManager() || $user->isHrAdvisor();
        });
    }

    public function register(): void
    {
    }

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->registerPolicies();

        $this->defineGates();
    }
}
