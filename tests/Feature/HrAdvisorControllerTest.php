<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\JobPoster;
use App\Models\HrAdvisor;
use App\Models\User;

class HrAdvisorControllerTest extends TestCase
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

    public function testSubmitJobClaim(): void
    {
        $hrAdvisor = factory(HrAdvisor::class)->create();
        $job = factory(JobPoster::class)->states(['draft'])->create();
        $this->assertEquals('draft', $job->status());
        $response = $this->followingRedirects()
            ->actingAs($hrAdvisor->user)
            ->json('post', "api/hr/$job->id/claim");
        $response->assertOk();
        /* $expectedIds = array_merge(
            ['job_poster_id' => $job->id],
            ['hr_advisor_id' => $hrAdvisor->user->id]
        );
        $this->assertDatabaseHas('claimed_jobs', $expectedIds); */
    }
}
