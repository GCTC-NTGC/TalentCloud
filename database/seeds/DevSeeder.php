<?php

use Illuminate\Database\Seeder;
use App\Models\Manager;
use App\Models\User;
use App\Models\JobPoster;
use App\Models\Applicant;
use App\Models\UserRole;

class DevSeeder extends Seeder
{
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
        $managerUser = User::where('email', $this->managerEmail)->first();
        // Create the test manager if it does not exist yet
        if ($managerUser === null) {
            $managerUser = factory(User::class)->state('manager')->create(['email' => 'manager@test.com']);
        }
        if (!$managerUser->hasRole('manager')) {
            $managerUser->user_role_id = UserRole::where('name', 'manager')->first()->id;
            $managerUser->save();
        }
        if (!$managerUser->manager) {
            $managerUser->manager()->save(factory(Manager::class)->create([
                'user_id' => $managerUser->id
            ]));
        }

        //Always add new jobs to the test manager
        $managerUser->manager->job_posters()->save(factory(JobPoster::class)->state('published')->create([
            'manager_id' => $managerUser->manager->id
        ]));
        $managerUser->manager->job_posters()->save(factory(JobPoster::class)->state('unpublished')->create([
            'manager_id' => $managerUser->manager->id
        ]));
        $managerUser->manager->job_posters()->save(factory(JobPoster::class)->state('closed')->create([
            'manager_id' => $managerUser->manager->id
        ]));

        $applicantUser = User::where('email', $this->applicantEmail)->first();
        if ($applicantUser === null) {
            $applicantUser = factory(User::class)->state('applicant')->create([
                'email' => $this->applicantEmail
            ]);
            $applicantUser->applicant()->save(factory(Applicant::class)->create([
                'user_id' => $applicantUser->id
            ]));
        }
    }
}
