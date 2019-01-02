<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Lang;

use App\Models\Criteria;
use App\Models\Manager;
use App\Models\JobPoster;
use App\Models\JobPosterKeyTask;
use App\Models\JobPosterQuestion;

class JobControllerTest extends TestCase
{
    /**
     * Ensure a manager can view their index page.
     *
     * @return void
     */
    public function testManagerIndex()
    {
        $manager = factory(Manager::class)->create();
        $jobPoster = factory(JobPoster::class)->create([
            'manager_id' => $manager->id
        ]);

        $otherManager = factory(Manager::class)->create();
        $otherJobPoster = factory(JobPoster::class)->create([
            'manager_id' => $otherManager->id
        ]);

        $response = $this->actingAs($manager->user)
            ->get('manager/jobs');
        $response->assertStatus(200);

        $response->assertSee("<h3>$jobPoster->title</h3>");
        $response->assertDontSee("<h3>$otherJobPoster->title</h3>");
    }

    /**
     * Ensure a manager can view the create Job Poster form.
     *
     * @return void
     */
    public function testManagerCreate()
    {
        $manager = factory(Manager::class)->create();

        $response = $this->actingAs($manager->user)
            ->get('manager/jobs/create');
        $response->assertStatus(200);

        $response->assertSee('<h2 class="heading--01">' . Lang::get('manager/job_create')['title'] . '</h2>');
        $response->assertViewIs('manager.job_create');
    }

    /**
     * Ensure a manager can edit an unpublished Job Poster they created.
     *
     * @return void
     */
    public function testManagerEdit()
    {
        $manager = factory(Manager::class)->create();
        $jobPoster = factory(JobPoster::class)->states('unpublished')->create([
            'manager_id' => $manager->id
        ]);

        $jobPoster->criteria()->saveMany(factory(Criteria::class, 2)->make([
            'job_poster_id' => $jobPoster->id
        ]));
        $jobPoster->job_poster_key_tasks()->saveMany(factory(JobPosterKeyTask::class, 2)->make([
            'job_poster_id' => $jobPoster->id
        ]));
        $jobPoster->job_poster_questions()->saveMany(factory(JobPosterQuestion::class, 2)->make([
            'job_poster_id' => $jobPoster->id
        ]));

        $response = $this->actingAs($manager->user)
            ->get("manager/jobs/$jobPoster->id/edit");

        $response->assertStatus(200);
        $response->assertViewIs('manager.job_create');
        // Check for a handful of properties
        $response->assertSee($jobPoster->city);
        $response->assertSee($jobPoster->education);
        $response->assertSee($jobPoster->title);
        $response->assertSee($jobPoster->impact);
        $response->assertSee($jobPoster->branch);
        $response->assertSee($jobPoster->division);
        $response->assertSee($jobPoster->education);
    }
}
