<?php

use Illuminate\Database\Seeder;
use App\Models\Manager;
use App\Models\User;
use App\Models\JobPoster;
use App\Models\Applicant;
use App\Models\JobApplication;
use App\Models\Reference;
use App\Models\Assessment;
use App\Models\Course;
use App\Models\Degree;
use App\Models\WorkExperience;

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
     * This seeder attaches all applicant objects to this user.
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
    public function run() : void
    {
        $adminUser = User::where('email', $this->adminEmail)->first();
        if ($adminUser === null) {
            $adminUser = factory(User::class)->state('admin')->create(['email' => $this->adminEmail]);
        }

        $managerUser = User::where('email', $this->managerEmail)->first();
        // Create the test manager if it does not exist yet.
        if ($managerUser === null) {
            $managerUser = factory(User::class)->state('upgradedManager')->create(['email' => $this->managerEmail]);
            $managerUser->manager()->save(factory(Manager::class)->create([
                'user_id' => $managerUser->id
            ]));
        }

        factory(JobPoster::class, 3)->state('published')->create([
            'manager_id' => $managerUser->manager->id
        ])->each(function ($job) : void {
            $job->job_applications()->saveMany(factory(JobApplication::class, 5))->create([
                'job_poster_id' => $job->id
            ]);
            // Then create one application with a priority user.
            $job->job_applications()->save(factory(JobApplication::class)->create([
                'job_poster_id' => $job->id,
                'applicant_id' => factory(Applicant::class)->create([
                        'user_id' => factory(User::class)->state('priority')->create()->id
                    ])->id
            ]));
        });
        factory(JobPoster::class, 3)->state('closed')->create([
            'manager_id' => $managerUser->manager->id
        ])->each(function ($job) : void {
            $job->job_applications()->saveMany(factory(JobApplication::class, 5))->create([
                'job_poster_id' => $job->id
            ]);
            // Then create one application with a priority user.
            $job->job_applications()->save(factory(JobApplication::class)->create([
                'job_poster_id' => $job->id,
                'applicant_id' => factory(Applicant::class)->create([
                    'user_id' => factory(User::class)->state('priority')->create()->id
                ])->id
            ]));
        });
        factory(JobPoster::class, 3)->state('draft')->create([
            'manager_id' => $managerUser->manager->id
        ]);
        factory(JobPoster::class, 3)->state('review_requested')->create([
            'manager_id' => $managerUser->manager->id
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
        $applicantUser->applicant->job_applications()->saveMany(factory(JobApplication::class, 3)->create([
            'applicant_id' => $applicantUser->applicant->id,
        ]));
        $applicantUser->applicant->job_applications()->saveMany(factory(JobApplication::class, 2)->state('draft')->create([
            'applicant_id' => $applicantUser->applicant->id,
        ]));
    }
}
