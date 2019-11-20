<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\JobPoster;
use App\Models\HrAdvisor;

class ClaimJobApiControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Run parent setup and provide reusable factories.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->faker = \Faker\Factory::create();
    }

    public function testClaimAndUnclaim(): void
    {
        // Factories
        $hrAdvisor = factory(HrAdvisor::class)->create();
        $job = factory(JobPoster::class)->states(['draft'])->create();
        $this->assertEquals('draft', $job->status());

        // Claim job poster
        $response = $this->followingRedirects()
            ->actingAs($hrAdvisor->user)
            ->json('put', "api/jobs/$job->id/claim");
        $response->assertOk();
        $expectedIds = array_merge(
            ['job_poster_id' => $job->id],
            ['hr_advisor_id' => $hrAdvisor->id]
        );
        $this->assertDatabaseHas('claimed_jobs', $expectedIds);

        // Unclaim job poster
        $response = $this->followingRedirects()
            ->actingAs($hrAdvisor->user)
            ->json('delete', "api/jobs/$job->id/claim");
        $response->assertOk();
        $this->assertDatabaseMissing('claimed_jobs', $expectedIds);
    }
}
