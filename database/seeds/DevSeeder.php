<?php

use Illuminate\Database\Seeder;
use App\Models\Manager;
use App\Models\User;
use App\Models\JobPoster;
use App\Models\Applicant;
use App\Models\JobApplication;
use App\Models\Reference;
use App\Models\Assessment;
use App\Models\RatingGuideQuestion;
use App\Models\RatingGuideAnswer;

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
     * Run the database seeds.
     *
     * @return void
     */
    public function run() : void
    {
        $adminUser = User::where('email', $this->adminEmail)->first();
        if ($adminUser === null) {
            $adminUser = factory(User::class)->states('admin')->create(['email' => $this->adminEmail]);
        }

        $managerUser = User::where('email', $this->managerEmail)->first();
        // Create the test manager if it does not exist yet
        if ($managerUser === null) {
            $managerUser = factory(User::class)->states('manager')->create(['email' => $this->managerEmail]);
            $managerUser->manager()->save(factory(Manager::class)->create([
                'user_id' => $managerUser->id
            ]));
        }

        factory(JobPoster::class, 3)->states('published')->create([
            'manager_id' => $managerUser->manager->id
        ])->each(function ($job) : void {
            $job->job_applications()->saveMany(factory(JobApplication::class, 5))->create([
                'job_poster_id' => $job->id
            ]);
            //Then create one application with a priority user
            $job->job_applications()->save(factory(JobApplication::class)->create([
                'job_poster_id' => $job->id,
                'applicant_id' => factory(Applicant::class)->create([
                        'user_id' => factory(User::class)->states('priority')->create()->id
                    ])->id
            ]));
        });
        factory(JobPoster::class, 3)->states('closed')->create([
            'manager_id' => $managerUser->manager->id
        ])->each(function ($job) : void {
            $job->job_applications()->saveMany(factory(JobApplication::class, 5))->create([
                'job_poster_id' => $job->id
            ]);
            //Then create one application with a priority user
            $job->job_applications()->save(factory(JobApplication::class)->create([
                'job_poster_id' => $job->id,
                'applicant_id' => factory(Applicant::class)->create([
                    'user_id' => factory(User::class)->state('priority')->create()->id
                ])->id
            ]));
        });
        factory(JobPoster::class, 3)->states('draft')->create([
            'manager_id' => $managerUser->manager->id
        ]);
        factory(JobPoster::class, 3)->states('review_requested')->create([
            'manager_id' => $managerUser->manager->id
        ]);

        // Create a Job Poster with an Assessment Plan
        $jobWithAssessment = factory(JobPoster::class)->states('draft')->create([
            'manager_id' => $managerUser->manager->id,
        ]);
        foreach ($jobWithAssessment->criteria as $criterion) {
            // Create an assessment for each criterion
            factory(Assessment::class)->states('withRatingGuide')->create([
                'criterion_id' => $criterion->id,
            ]);
        };

        $applicantUser = User::where('email', $this->applicantEmail)->first();
        if ($applicantUser === null) {
            $applicantUser = factory(User::class)->states('applicant')->create([
                'email' => $this->applicantEmail
            ]);
            $applicantUser->applicant()->save(factory(Applicant::class)->create([
                'user_id' => $applicantUser->id
            ]));
        }

        // Add to application profile
        $applicantUser->applicant->references()->saveMany(factory(Reference::class, 3)->create([
            'applicant_id' => $applicantUser->applicant->id
        ]));

        // Create several applications for test user.
        $applicantUser->applicant->job_applications()->saveMany(factory(JobApplication::class, 3)->create([
            'applicant_id' => $applicantUser->applicant->id,
        ]));
        $applicantUser->applicant->job_applications()->saveMany(factory(JobApplication::class, 2)->states('draft')->create([
            'applicant_id' => $applicantUser->applicant->id,
        ]));
    }
}
