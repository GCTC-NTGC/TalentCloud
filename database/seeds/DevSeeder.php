<?php

use App\Models\Applicant;
use App\Models\Assessment;
use App\Models\Course;
use App\Models\Degree;
use App\Models\Lookup\Department;
use App\Models\ExperienceEducation;
use App\Models\ExperienceSkill;
use App\Models\ExperienceWork;
use App\Models\HrAdvisor;
use App\Models\JobApplication;
use App\Models\JobPoster;
use App\Models\Manager;
use App\Models\Reference;
use App\Models\Skill;
use App\Models\User;
use App\Models\WorkExperience;
use Illuminate\Database\Seeder;

class DevSeeder extends Seeder // phpcs:ignore
{
    /**
     * This seeder uses this email for an admin user.
     * Note: all seeded users have 'password' for a password.
     *
     * @var string
     */
    protected $adminEmail = 'admin@test.com';

    /**
     * This seeder connects all manager objects to this user.
     * Note: all seeded users have 'password' for a password.
     *
     * @var string
     */
    protected $managerEmail = 'manager@test.com';

    /**
     * This seeder attaches all applicant objects to this user.
     * Note: all seeded users have 'password' for a password.
     *
     * @var string
     */
    protected $applicantEmail = 'applicant@test.com';

    /**
     * This seeder attaches all hr_advisor objects to this user.
     * Note: all seeded users have 'password' for a password.
     *
     * @var string
     */
    protected $hrAdvisorEmail = 'hr_advisor@test.com';

    /**
     * Note: all seeded users have 'password' for a password.
     *
     * @var string
     */
    protected $newApplicantEmail = 'newApplicant@test.com';


    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        /*
        Get random department_id.
        Use departmentId to ensure any jobs that are attached to a given user belong to that user's department.
        */
        $departmentId = Department::inRandomOrder()->first()->id;

        $adminUser = User::where('email', $this->adminEmail)->first();
        if ($adminUser === null) {
            $adminUser = factory(User::class)->state('admin')->create([
                'email' => $this->adminEmail,
                'department_id' => $departmentId,
            ]);
        }

        $hrUser = User::where('email', $this->hrAdvisorEmail)->first();
        if ($hrUser === null) {
            $hrUser = factory(User::class)->state('hr_advisor')->create([
                'email' => $this->hrAdvisorEmail,
                'department_id' => $departmentId,
            ]);
            $hrUser->hr_advisor()->save(factory(HrAdvisor::class)->create([
                'user_id' => $hrUser->id,
            ]));
        }

        $managerUser = User::where('email', $this->managerEmail)->first();
        // Create the test manager if it does not exist yet.
        if ($managerUser === null) {
            $managerUser = factory(User::class)->state('upgradedManager')->create([
                'email' => $this->managerEmail,
                'department_id' => $departmentId,
            ]);
            $managerUser->manager()->save(factory(Manager::class)->create([
                'user_id' => $managerUser->id,
            ]));
        }

        factory(JobPoster::class, 3)->state('live')->create([
            'manager_id' => $managerUser->manager->id,
            'department_id' => $departmentId,
        ])->each(function ($job): void {
            $job->job_applications()->saveMany(factory(JobApplication::class, 5))->create([
                'job_poster_id' => $job->id
            ]);
            // Then create one application with a priority user.
            $job->job_applications()->save(factory(JobApplication::class)->states(['version2', 'submitted'])->create([
                'job_poster_id' => $job->id,
                'applicant_id' => factory(Applicant::class)->create([
                    'user_id' => factory(User::class)->state('priority')->create()->id
                ])->id,
            ]));
        });
        factory(JobPoster::class, 3)->state('closed')->create([
            'manager_id' => $managerUser->manager->id,
            'department_id' => $departmentId,
        ])->each(function ($job): void {
            $job->job_applications()->saveMany(factory(JobApplication::class, 5))->create([
                'job_poster_id' => $job->id
            ]);
            // Then create one application with a priority user.
            $job->job_applications()->save(factory(JobApplication::class)->states(['version2', 'submitted'])->create([
                'job_poster_id' => $job->id,
                'applicant_id' => factory(Applicant::class)->create([
                    'user_id' => factory(User::class)->state('priority')->create()->id
                ])->id,
            ]));
        });
        factory(JobPoster::class, 3)->state('draft')->create([
            'manager_id' => $managerUser->manager->id,
            'department_id' => $departmentId,
        ]);
        factory(JobPoster::class, 3)->state('review_requested')->create([
            'manager_id' => $managerUser->manager->id,
            'department_id' => $departmentId,
        ]);

        // Create a Job Poster with an Assessment Plan.
        $jobWithAssessment = factory(JobPoster::class)->state('draft')->create([
            'manager_id' => $managerUser->manager->id,
        ]);
        foreach ($jobWithAssessment->criteria as $criterion) {
            // Create an assessment for each criterion.
            factory(Assessment::class)->state('withRatingGuide')->create([
                'criterion_id' => $criterion->id,
            ]);
        };

        $applicantUser = User::where('email', $this->applicantEmail)->first();
        if ($applicantUser === null) {
            $applicantUser = factory(User::class)->state('applicant')->create([
                'email' => $this->applicantEmail
            ]);
            $applicantUser->applicant()->save(factory(Applicant::class)->create([
                'user_id' => $applicantUser->id
            ]));
        }

        $newApplicantUser = User::where('email', $this->newApplicantEmail)->first();
        if ($newApplicantUser === null) {
            $newApplicantUser = factory(User::class)->state('applicant')->create([
                'email' => $this->newApplicantEmail
            ]);
            $newApplicantUser->applicant()->save(factory(Applicant::class)->create([
                'user_id' => $newApplicantUser->id
            ]));
        }

        // Add to application profile.
        $applicantUser->applicant->references()->saveMany(factory(Reference::class, 3)->create([
            'referenceable_id' => $applicantUser->applicant->id
        ]));
        $applicantUser->applicant->degrees()->saveMany(factory(Degree::class, 2)->create([
            'degreeable_id' => $applicantUser->applicant->id
        ]));
        $applicantUser->applicant->courses()->saveMany(factory(Course::class, 3)->create([
            'courseable_id' => $applicantUser->applicant->id
        ]));
        $applicantUser->applicant->work_experiences()->saveMany(factory(WorkExperience::class, 3)->create([
            'experienceable_id' => $applicantUser->applicant->id
        ]));

        // Create several applications for test user.
        $applicantUser->applicant->job_applications()->saveMany(factory(JobApplication::class, 1)
            ->state('submitted')->create([
                'applicant_id' => $applicantUser->applicant->id,
        ]));
        $applicantUser->applicant->job_applications()->saveMany(factory(JobApplication::class, 1)
            ->states(['version2', 'submitted'])->create([
                'applicant_id' => $applicantUser->applicant->id,
        ]));
        $applicantUser->applicant->job_applications()->saveMany(factory(JobApplication::class, 1)
            ->state('draft')->create([
                'applicant_id' => $applicantUser->applicant->id,
        ]));
        $applicantUser->applicant->job_applications()->saveMany(factory(JobApplication::class, 1)
            ->states(['draft', 'version2'])->create([
                'applicant_id' => $applicantUser->applicant->id,
        ]));

        // Ensure there are several jobs the hr advisor can claim.
        $hrDepartment = $hrUser->department_id;
        factory(JobPoster::class)->states(['byUpgradedManager', 'draft'])
            ->create(['department_id' => $hrDepartment]);
        factory(JobPoster::class)->states(['byUpgradedManager', 'review_requested'])
            ->create(['department_id' => $hrDepartment]);
        $hrOpenJob = factory(JobPoster::class)->states(['byUpgradedManager', 'live'])
            ->create(['department_id' => $hrDepartment]);
        $hrClosedJob = factory(JobPoster::class)->states(['byUpgradedManager', 'closed'])
            ->create(['department_id' => $hrDepartment]);

        $hrOpenJob->job_applications()->saveMany(factory(JobApplication::class, 5))->create([
            'job_poster_id' => $hrOpenJob->id
        ]);
        $hrClosedJob->job_applications()->saveMany(factory(JobApplication::class, 5))->create([
            'job_poster_id' => $hrClosedJob->id
        ]);

        // Create relationship between applicants and skills.
        for ($i=0; $i < 100; $i++) {
            DB::table('applicants_skills')->updateOrInsert(
                [
                    'applicant_id' => Applicant::inRandomOrder()->get()->first()->id
                ],
                [
                    'skill_id' => Skill::inRandomOrder()->get()->first()->id
                ]
            );
        }
    }
}
