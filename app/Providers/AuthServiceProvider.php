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
        Gate::define('advisor-claim-job', function ($advisor, $jobPoster) {
            return $advisor->user->can('claim', $jobPoster);
        });
        Gate::define('advisor-unclaim-job', function ($advisor, $jobPoster) {
            return $advisor->user->can('unclaim', $jobPoster);
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
