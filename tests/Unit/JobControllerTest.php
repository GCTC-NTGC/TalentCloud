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
}
