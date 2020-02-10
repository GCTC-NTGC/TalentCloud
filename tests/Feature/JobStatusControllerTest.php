<?php

namespace Tests\Feature;

use App\Models\HrAdvisor;
use App\Models\JobPoster;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class JobStatusControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Ensure several legal transitions work as expected.
     *
     * @return void
     */
    public function testLegalTransitions(): void
    {
        $job = factory(JobPoster::class)->state('draft')->create();
        $this->assertEquals('draft', $job->fresh()->job_poster_status->name);

        $response = $this->actingAs($job->manager->user)->post(
            route('hr_advisor.jobs.setJobStatus', ['jobPoster' => $job, 'status' => 'review_hr'])
        );
        $response->assertStatus(302);
        $this->assertEquals('review_hr', $job->fresh()->job_poster_status->name);

        $hrAdvisor = factory(HrAdvisor::class)->create();
        $hrAdvisor->claimed_jobs()->save($job);

        $responseHr =  $this->actingAs($job->manager->user)->post(
            route('hr_advisor.jobs.setJobStatus', ['jobPoster' => $job, 'status' => 'translation'])
        );
        $responseHr->assertStatus(302);
        $this->assertEquals('translation', $job->fresh()->job_poster_status->name);
    }
}
