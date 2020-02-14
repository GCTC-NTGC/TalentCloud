<?php

namespace Tests\Feature;

use App\Models\HrAdvisor;
use App\Models\JobPoster;
use App\Models\Lookup\JobPosterStatus;
use App\Models\User;
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
        $job = factory(JobPoster::class)->states(['draft', 'byUpgradedManager'])->create();
        $this->assertEquals('draft', $job->fresh()->job_poster_status->name);

        $responseReview = $this->actingAs($job->manager->user)->post(
            route('manager.jobs.setJobStatus', ['jobPoster' => $job, 'status' => 'review_hr'])
        );
        $responseReview->assertStatus(302);
        $this->assertEquals('review_hr', $job->fresh()->job_poster_status->name);

        $hrAdvisor = factory(HrAdvisor::class)->create([
            'department_id' => $job->department_id
        ]);
        $hrAdvisor->claimed_jobs()->attach($job);

        $responseTranslation = $this->actingAs($hrAdvisor->fresh()->user)->post(
            route('hr_advisor.jobs.setJobStatus', ['jobPoster' => $job, 'status' => 'translation'])
        );
        $responseTranslation->assertStatus(302);
        $this->assertEquals('translation', $job->fresh()->job_poster_status->name);

        $admin = factory(User::class)->state('admin')->create([
            'gov_email' => 'admin@test.gov'
        ]);
        $admin->hr_advisor()->save(factory(HrAdvisor::class)->create([
            'department_id' => $job->department_id,
            'user_id' => $admin->id,
        ]));
        $responseFinalReview = $this->actingAs($admin)->post(
            route('hr_advisor.jobs.setJobStatus', ['jobPoster', $job, 'status' => 'final_review_manager'])
        );
        $responseFinalReview->assertStatus(302);
        $this->assertEquals('final_review_manager', $job->fresh()->job_poaster_status->name);

        $responsePending = $this->actingAs($job->manager->user)->post(
            route('manager.jobs.setJobStatus', ['jobPoster' => $job, 'status' => 'pending_approval'])
        );
        $responsePending->assertStatus(302);
        $this->assertEquals('pendingApproval', $job->fresh()->job_poster_status->name);

        $responseApproved = $this->actingAs($hrAdvisor->fresh()->user)->post(
            route('hr_advisor.jobs.setJobStatus', ['jobPoster' => $job, 'status' => 'approved'])
        );
        $responseApproved->assertStatus(302);
        $this->assertEquals('approved', $job->fresh()->job_poster_status->name);

        $responsePublished = $this->actingAs($admin)->post(
            route('hr_advisor.jobs.setJobStatus', ['jobPoster', $job, 'status' => 'published'])
        );
        $responsePublished->assertStatus(302);
        $this->assertEquals('published', $job->fresh()->job_poaster_status->name);
    }

    /**
     * Illegal transitions should fail and leave the status unchanged.
     *
     * @return void
     */
    public function testIllegalTransitions(): void
    {
        $job = factory(JobPoster::class)->states(['draft', 'byUpgradedManager'])->create();
        $this->assertEquals('draft', $job->fresh()->job_poster_status->name);

        $response = $this->actingAs($job->manager->user)->post(
            route('manager.jobs.setJobStatus', ['jobPoster' => $job, 'status' => 'published'])
        );
        $response->assertStatus(400);
        $this->assertEquals('draft', $job->fresh()->job_poster_status->name);

        $job->job_poster_status()->save(JobPosterStatus::where('name', 'review_hr')->first());

        $hrAdvisor = factory(HrAdvisor::class)->create([
            'department_id' => $job->department_id
        ]);
        $hrAdvisor->claimed_jobs()->attach($job);

        $responseHr =  $this->actingAs($hrAdvisor->fresh()->user)->post(
            route('hr_advisor.jobs.setJobStatus', ['jobPoster' => $job, 'status' => 'draft'])
        );
        $responseHr->assertStatus(400);
        $this->assertEquals('review_hr', $job->fresh()->job_poster_status->name);
    }

    /**
     * Legal transitions should fail and leave the status unchanged if the wrong user initiates them.
     *
     * @return void
     */
    public function testTransitionByWrongUser(): void
    {
        $job = factory(JobPoster::class)->states(['draft', 'byUpgradedManager'])->create();
        $job->job_poster_status_id = JobPosterStatus::where('name', 'review_hr')->first()->id;
        $job->save();

        $this->assertEquals('review_hr', $job->fresh()->job_poster_status->name);

        $hrAdvisor = factory(HrAdvisor::class)->create([
            'department_id' => $job->department_id
        ]);
        $hrAdvisor->claimed_jobs()->attach($job);

        $response = $this->actingAs($job->manager->user)->post(
            route('manager.jobs.setJobStatus', ['jobPoster' => $job, 'status' => 'review_manager'])
        );
        $response->assertStatus(400);
        $this->assertEquals('review_hr', $job->fresh()->job_poster_status->name);
    }

    public function testTransitionHistory(): void
    {
        $job = factory(JobPoster::class)->states(['draft', 'byUpgradedManager'])->create();
        $this->assertEquals('draft', $job->fresh()->job_poster_status->name);
        $this->assertEmpty($job->fresh()->job_poster_status_histories);

        $responseReview = $this->actingAs($job->manager->user)->post(
            route('manager.jobs.setJobStatus', ['jobPoster' => $job, 'status' => 'review_hr'])
        );

        $this->assertCount(1, $job->fresh()->job_poster_status_histories);
        $this->assertDatabaseHas('job_poster_status_histories', [
            'job_poster_id' => $job->id,
            'user_id' => $job->manager->user->id,
            'from_job_poster_status_id' => JobPosterStatus::where('name', 'draft')->first()->id,
            'to_job_poster_status_id' => JobPosterStatus::where('name', 'review_hr')->first()->id,
        ]);
    }
}
