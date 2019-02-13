<?php

use Illuminate\Database\Seeder;
use App\Models\Manager;
use App\Models\User;
use App\Models\JobPoster;
use App\Models\Applicant;
use App\Models\UserRole;
use App\Models\JobApplication;

class DevSeeder extends Seeder
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
    public function run()
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

        //Add new jobs to the test manager, along with applications if they've been open
        $managerUser->manager->job_posters()->save(factory(JobPoster::class)->state('published')->create([
            'manager_id' => $managerUser->manager->id
        ]))->each(function ($job) : void {
            $job->job_applications()->saveMany(factory(JobApplication::class, 10)->create([
                'job_poster_id' => $job->id
            ]));
        });
        $managerUser->manager->job_posters()->save(factory(JobPoster::class)->state('unpublished')->create([
            'manager_id' => $managerUser->manager->id
        ]));
        $managerUser->manager->job_posters()->save(factory(JobPoster::class)->state('closed')->create([
            'manager_id' => $managerUser->manager->id
        ]))->each(function ($job) : void {
            $job->job_applications()->saveMany(factory(JobApplication::class, 10)->create([
                'job_poster_id' => $job->id
            ]));
        });

        $applicantUser = User::where('email', $this->applicantEmail)->first();
        if ($applicantUser === null) {
            $applicantUser = factory(User::class)->state('applicant')->create([
                'email' => $this->applicantEmail
            ]);
            $applicantUser->applicant()->save(factory(Applicant::class)->create([
                'user_id' => $applicantUser->id
            ]));
        }

        // Create several applications for test user.
        $applicantUser->applicant->job_applications()->saveMany(factory(JobApplication::class, 5)->create([
            'applicant_id' => $applicantUser->applicant->id,
        ]));


    }
}
