<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\Applicant;
use App\Models\HrAdvisor;
use App\Models\JobApplication;
use App\Models\JobPoster;
use App\Models\Lookup\Department;
use App\Models\Manager;
use App\Models\User;

class UserApiControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Anonymous Users can't view any User accounts.
     *
     * @return void
     */
    public function testGuestAccess(): void
    {
        $applicant = factory(Applicant::class)->create();
        $response = $this->json('get', 'api/users');
        $response->assertStatus(403);
        $response->assertJson(['status' => 'unauthorized']);
        $response = $this->json('get', 'api/users/' . $applicant->user->id);
        $response->assertStatus(403);
        $response->assertJson(['status' => 'unauthorized']);
    }

    /**
     * Admin Users can view everyone.
     *
     * @return void
     */
    public function testAdminAccess(): void
    {
        $randomUsers = factory(Applicant::class, 5)->create();

        $transportCanada = Department::find(3); // Transport Canada.

        $deptManager = factory(Manager::class)->state('upgraded')->create([
            'department_id' => $transportCanada->id
        ]);

        $job = factory(JobPoster::class)->state('closed')->create(['manager_id' => $deptManager->id]);
        $job->job_applications()->saveMany(factory(JobApplication::class, 5))->create([
            'job_poster_id' => $job->id
        ])->each(function ($application, $key) use ($randomUsers): void {
            $application->applicant_id = $randomUsers[$key]->id;
        });

        $hrManager = factory(HrAdvisor::class)->create([
            'department_id' => $transportCanada->id
        ]);
        $hrManager->claimed_jobs()->attach($job);

        $admin = factory(User::class)->state('admin')->create();
        $otherAdmin = factory(User::class)->state('admin')->create();

        $response = $this->followingRedirects()
            ->actingAs($admin)
            ->json('get', 'api/users');
        $response->assertOk();

        $response->assertJsonFragment($admin->toArray());
        $response->assertJsonFragment($otherAdmin->toArray());
        $response->assertJsonFragment($hrManager->user->toArray());
        $response->assertJsonFragment($deptManager->user->toArray());

        foreach ($randomUsers as $user) {
            $response->assertJsonFragment($user->user->toArray());
        }

        $response = $this->followingRedirects()
            ->actingAs($admin)
            ->json('get', 'api/users/' . $admin->id);
        $response->assertOk();

        $response = $this->followingRedirects()
            ->actingAs($admin)
            ->json('get', 'api/users/' . $otherAdmin->id);
        $response->assertOk();

        $response = $this->followingRedirects()
            ->actingAs($admin)
            ->json('get', 'api/users/' . $deptManager->user->id);
        $response->assertOk();

        $response = $this->followingRedirects()
            ->actingAs($admin)
            ->json('get', 'api/users/' . $hrManager->user->id);
        $response->assertOk();

        $response = $this->followingRedirects()
            ->actingAs($admin)
            ->json('get', 'api/users/' . $randomUsers[0]->user->id);
        $response->assertOk();
    }

    /**
     * HrAdvisor Users can view Managers and Applicants who
     * have applied to Jobs posted by Managers within their department.
     *
     * @return void
     */
    public function testHrAdvisorAccess(): void
    {
        $transportCanada = Department::find(3); // Transport Canada.
        $healthCanada = Department::find(4); // Health Canada.

        // Generate some useful testing data:
        // Users unrelated to the current Manager/HR Advisor,
        // a Job Poster with Applicants, etc.
        $randomUsers = factory(Applicant::class, 5)->create();
        $otherUsers = factory(Applicant::class, 3)->create();

        $deptManager = factory(Manager::class)->state('upgraded')->create([
            'department_id' => $transportCanada->id
        ]);

        $otherDeptManager = factory(Manager::class)->state('upgraded')->create([
            'department_id' => $healthCanada->id
        ]);

        $job = factory(JobPoster::class)->state('closed')->create([
            'department_id'=> $transportCanada->id,
            'manager_id' => $deptManager->id
        ]);
        $job->job_applications()->saveMany(factory(JobApplication::class, 5)->create([
            'job_poster_id' => $job->id,
        ])->each(function ($application, $key) use ($randomUsers): void {
            $application->applicant_id = $randomUsers[$key]->id;
        }));

        $otherJob = factory(JobPoster::class)->state('closed')->create([
            'department_id' => $healthCanada->id,
            'manager_id' => $otherDeptManager->id
        ]);
        $otherJob->job_applications()->saveMany(factory(JobApplication::class, 3)->create([
            'job_poster_id' => $job->id,
        ])->each(function ($application, $key) use ($otherUsers): void {
            $application->applicant_id = $otherUsers[$key]->id;
        }));

        $hrManager = factory(HrAdvisor::class)->create([
            'department_id' => $transportCanada->id
        ]);
        $hrManager->claimed_jobs()->attach($job);

        $otherHrManager = factory(HrAdvisor::class)->create([
            'department_id' => $healthCanada->id,
        ]);

        $response = $this->followingRedirects()
            ->actingAs($hrManager->user)
            ->json('get', 'api/users');
        $response->assertOk();

        foreach ($otherUsers as $otherUser) {
            $response->assertJsonMissingExact($this->makeFragment($otherUser->user));
        }

        $hrManagerArray = $this->makeFragment($hrManager->user);
        $otherHrManagerArray = $this->makeFragment($otherHrManager->user);
        $deptManagerArray = $this->makeFragment($deptManager->user);
        $otherDeptManagerArray = $this->makeFragment($otherDeptManager->user);

        $response->assertJsonMissingExact($otherHrManagerArray);

        $response->assertJsonFragment($hrManagerArray);
        $response->assertJsonFragment($deptManagerArray);
        $response->assertJsonFragment($otherDeptManagerArray);

        foreach ($randomUsers as $randomUser) {
            $response->assertJsonFragment($this->makeFragment($randomUser->user));
        }

        $admin = factory(User::class)->state('admin')->create();

        $response = $this->followingRedirects()
            ->actingAs($hrManager->user)
            ->json('get', 'api/users/' . $admin->id);
        $response->assertStatus(403);
        $response->assertJson(['status' => 'unauthorized']);

        $response = $this->followingRedirects()
            ->actingAs($hrManager->user)
            ->json('get', 'api/users/' . $otherHrManager->user->id);
        $response->assertStatus(403);
        $response->assertJson(['status' => 'unauthorized']);

        $response = $this->followingRedirects()
            ->actingAs($hrManager->user)
            ->json('get', 'api/users/' . $deptManager->user->id);
        $response->assertOk();

        $response = $this->followingRedirects()
            ->actingAs($hrManager->user)
            ->json('get', 'api/users/' . $otherDeptManager->user->id);
        $response->assertOk();

        $response = $this->followingRedirects()
            ->actingAs($hrManager->user)
            ->json('get', 'api/users/' . $otherUsers[0]->user->id);
        $response->assertStatus(403);
        $response->assertJson(['status' => 'unauthorized']);

        $response = $this->followingRedirects()
            ->actingAs($hrManager->user)
            ->json('get', 'api/users/' . $randomUsers[0]->user->id);
        $response->assertOk();

        $hrManager->claimed_jobs()->detach($job);

        $response = $this->followingRedirects()
        ->actingAs($hrManager->user)
        ->json('get', 'api/users/' . $randomUsers[0]->user->id);
        $response->assertStatus(403);
        $response->assertJson(['status' => 'unauthorized']);
    }

    /**
     * Manager Users can view Applicants who have applied to Jobs they have
     * created.
     *
     * @return void
     */
    public function testManagerAccess(): void
    {
        $transportCanada = Department::find(3); // Transport Canada.
        $healthCanada = Department::find(4); // Health Canada.

        // Generate some useful testing data:
        // Users unrelated to the current Manager,
        // a Job Poster with Applicants, etc.
        $randomUsers = factory(Applicant::class, 5)->create();
        $otherUsers = factory(Applicant::class, 3)->create();

        $deptManager = factory(Manager::class)->state('upgraded')->create([
            'department_id' => $transportCanada->id
        ]);

        $otherDeptManager = factory(Manager::class)->state('upgraded')->create([
            'department_id' => $healthCanada->id
        ]);

        $job = factory(JobPoster::class)->state('closed')->create([
            'department_id'=> $transportCanada->id,
            'manager_id' => $deptManager->id
        ]);
        $job->job_applications()->saveMany(factory(JobApplication::class, 5)->create([
            'job_poster_id' => $job->id,
        ])->each(function ($application, $key) use ($randomUsers): void {
            $application->applicant_id = $randomUsers[$key]->id;
        }));

        $otherJob = factory(JobPoster::class)->state('closed')->create([
            'department_id' => $healthCanada->id,
            'manager_id' => $otherDeptManager->id
        ]);
        $otherJob->job_applications()->saveMany(factory(JobApplication::class, 3)->create([
            'job_poster_id' => $job->id,
        ])->each(function ($application, $key) use ($otherUsers): void {
            $application->applicant_id = $otherUsers[$key]->id;
        }));

        $response = $this->followingRedirects()
            ->actingAs($deptManager->user)
            ->json('get', 'api/users');
        $response->assertOk();

        foreach ($otherUsers as $otherUser) {
            $response->assertJsonMissingExact($this->makeFragment($otherUser->user));
        }

        $deptManagerArray = $this->makeFragment($deptManager->user);
        $otherDeptManagerArray = $this->makeFragment($otherDeptManager->user);

        $response->assertJsonFragment($deptManagerArray);
        $response->assertJsonFragment($otherDeptManagerArray);

        foreach ($randomUsers as $randomUser) {
            $response->assertJsonFragment($this->makeFragment($randomUser->user));
        }

        $response = $this->followingRedirects()
            ->actingAs($deptManager->user)
            ->json('get', 'api/users/' . $deptManager->user->id);
        $response->assertOk();

        $response = $this->followingRedirects()
            ->actingAs($deptManager->user)
            ->json('get', 'api/users/' . $otherDeptManager->user->id);
        $response->assertOk();

        $response = $this->followingRedirects()
            ->actingAs($deptManager->user)
            ->json('get', 'api/users/' . $otherUsers[0]->user->id);
        $response->assertStatus(403);
        $response->assertJson(['status' => 'unauthorized']);

        $response = $this->followingRedirects()
            ->actingAs($deptManager->user)
            ->json('get', 'api/users/' . $randomUsers[0]->user->id);
        $response->assertOk();

        $admin = factory(User::class)->state('admin')->create();

        $response = $this->followingRedirects()
            ->actingAs($deptManager->user)
            ->json('get', 'api/users/' . $admin->id);
        $response->assertStatus(403);
        $response->assertJson(['status' => 'unauthorized']);

        $hrManager = factory(HrAdvisor::class)->create([
            'department_id' => $transportCanada->id
        ]);

        $response = $this->followingRedirects()
            ->actingAs($deptManager->user)
            ->json('get', 'api/users/' . $hrManager->user->id);
        $response->assertOk();
    }

    /**
     * Basic Users can view themselves and Managers.
     *
     * @return void
     */
    public function testBasicAccess(): void
    {
        $applicant = factory(Applicant::class)->create();
        $otherApplicant = factory(Applicant::class)->create();
        $manager = factory(Manager::class)->state('upgraded')->create();
        $hrAdvisor = factory(HrAdvisor::class)->create();
        $admin = factory(User::class)->state('admin')->create();

        $response = $this->followingRedirects()
            ->actingAs($applicant->user)
            ->json('get', 'api/users/' . $applicant->user->id);
        $response->assertOk();

        $response = $this->followingRedirects()
            ->actingAs($applicant->user)
            ->json('get', 'api/users/' . $admin->id);
        $response->assertStatus(403);
        $response->assertJson(['status' => 'unauthorized']);

        $response = $this->followingRedirects()
            ->actingAs($applicant->user)
            ->json('get', 'api/users/' . $otherApplicant->user->id);
        $response->assertStatus(403);
        $response->assertJson(['status' => 'unauthorized']);

        $response = $this->followingRedirects()
            ->actingAs($applicant->user)
            ->json('get', 'api/users/' . $manager->user->id);
        $response->assertOk();

        $response = $this->followingRedirects()
            ->actingAs($applicant->user)
            ->json('get', 'api/users/' . $hrAdvisor->user->id);
        $response->assertStatus(403);
        $response->assertJson(['status' => 'unauthorized']);
    }

    /**
     * Massage the User attributes to check for a subset of
     * values within the API response.
     *
     * @param App\Models\User $user User model to parse.
     *
     * @return array
     */
    private function makeFragment(User $user): array
    {
        return [
            'email' => $user->email,
            'first_name' => $user->first_name,
            'gov_email' => $user->gov_email,
            'id' => $user->id,
            'is_confirmed' => $user->is_confirmed,
            'is_priority' => $user->is_priority,
            'last_name' => $user->last_name,
        ];
    }
}
