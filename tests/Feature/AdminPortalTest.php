<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\JobPoster;
use App\Models\Manager;
use App\Models\User;
use App\Models\Skill;
use App\Models\Lookup\Department;

class AdminPortalTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Run parent setup and provide reusable factories.
     *
     * @return void
     */
    protected function setUp() : void
    {
        parent::setUp();

        $this->admin = factory(User::class)->states('admin')->create();
        $this->manager = factory(Manager::class)->create();
        $this->jobPoster = factory(JobPoster::class)->states('draft')->create();
        $this->skillId = Skill::inRandomOrder()->first()->id;
        $this->departmentId = Department::inRandomOrder()->first()->id;
    }

    /**
     * Ensure other user roles cannot access the
     * admin portal
     *
     * @return void
     */
    public function testAdminPolicy() : void
    {
        $response = $this->actingAs($this->manager->user)
            ->followingRedirects()
            ->get('admin');
        $response->assertStatus(200);
        $response->assertViewIs('manager.home');
    }

    /**
     * Ensure an admin user can view an edit page for
     * a Job Poster.
     *
     * @return void
     */
    public function testJobPosterEdit() : void
    {
        $response = $this->actingAs($this->admin)
            ->get('admin/job-poster/' . $this->jobPoster->id . '/edit');
        $response->assertStatus(200);
    }

    /**
     * Ensure an admin user can view an edit page for
     * a Skill.
     *
     * @return void
     */
    public function testSkillEdit() : void
    {
        $response = $this->actingAs($this->admin)
            ->get("admin/skill/$this->skillId/edit");
        $response->assertStatus(200);
    }

    /**
     * Ensure an admin user can view an edit page for
     * a User.
     *
     * @return void
     */
    public function testUserEdit() : void
    {
        $response = $this->actingAs($this->admin)
            ->get('admin/user/' . $this->admin->id . '/edit');
        $response->assertStatus(200);
    }

    /**
     * Ensure an admin user can view an edit page for a department.
     *
     * @return void
     */
    public function testDepartmentEdit() : void
    {
        $response = $this->actingAs($this->admin)
            ->get("admin/department/$this->departmentId/edit");
        $response->assertStatus(200);
    }

        /**
     * Ensure an admin user can view a create page for a department.
     *
     * @return void
     */
    public function testDepartmentCreate() : void
    {
        $response = $this->actingAs($this->admin)
            ->get("admin/department/$this->departmentId/create");
        $response->assertStatus(200);
    }
}
