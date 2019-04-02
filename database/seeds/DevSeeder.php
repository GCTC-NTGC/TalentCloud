<?php

use Illuminate\Database\Seeder;
use App\Models\Manager;
use App\Models\User;
use App\Models\JobPoster;
use App\Models\Applicant;
use App\Models\JobApplication;
use App\Models\Reference;

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
            $adminUser = factory(User::class)->state('admin')->create(['email' => $this->adminEmail]);
        }

        $managerUser = User::where('email', $this->managerEmail)->first();
        // Create the test manager if it does not exist yet
        if ($managerUser === null) {
            $managerUser = factory(User::class)->state('manager')->create(['email' => $this->managerEmail]);
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
        });
        factory(JobPoster::class, 3)->state('closed')->create([
            'manager_id' => $managerUser->manager->id
        ])->each(function ($job) : void {
            $job->job_applications()->saveMany(factory(JobApplication::class, 5))->create([
                'job_poster_id' => $job->id
            ]);
        });
        factory(JobPoster::class, 3)->state('draft')->create([
            'manager_id' => $managerUser->manager->id
        ]);
        factory(JobPoster::class, 3)->state('review_requested')->create([
            'manager_id' => $managerUser->manager->id
        ]);

        $applicantUser = User::where('email', $this->applicantEmail)->first();
        if ($applicantUser === null) {
            $applicantUser = factory(User::class)->state('applicant')->create([
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
