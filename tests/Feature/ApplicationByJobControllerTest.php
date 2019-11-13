<?php

namespace Tests\Feature;

use App\Models\JobApplication;
use App\Models\JobPoster;
use App\Models\Manager;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApplicationByJobControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndexViewFailsForPublic() : void
    {
        $manager = factory(Manager::class)->create();
        $job = factory(JobPoster::class)->state('closed')->create(['manager_id' => $manager->id]);
        $job->job_applications()->saveMany(factory(JobApplication::class, 5))->create([
            'job_poster_id' => $job->id
        ]);
        $response = $this->get(route('manager.jobs.applications', $job->id));
        $response->assertRedirect(route('manager.login'));
    }

    public function testIndexViewFailsForOtherManager() : void
    {
        $manager = factory(Manager::class)->create();
        $job = factory(JobPoster::class)->state('closed')->create(['manager_id' => $manager->id]);
        $job->job_applications()->saveMany(factory(JobApplication::class, 5))->create([
            'job_poster_id' => $job->id
        ]);
        $otherManager = factory(Manager::class)->create();
        $response = $this->actingAs($otherManager->user)
            ->get(route('manager.jobs.applications', $job->id));
        $response->assertStatus(403);
    }
    public function testIndexView() : void
    {
        $manager = factory(Manager::class)->create();
        $job = factory(JobPoster::class)->state('closed')->create(['manager_id' => $manager->id]);
        $job->job_applications()->saveMany(factory(JobApplication::class, 5))->create([
            'job_poster_id' => $job->id
        ]);
        $response = $this->actingAs($manager->user)
            ->get(route('manager.jobs.applications', $job->id));
        $response->assertOk();
        foreach ($job->job_applications as $application) {
            $response->assertSee($application->applicant->user->name);
        }
    }
}
