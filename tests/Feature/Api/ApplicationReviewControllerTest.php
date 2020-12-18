<?php

namespace Tests\Feature\Api;

use App\Models\ApplicationReview;
use App\Models\JobApplication;
use App\Models\JobPoster;
use App\Models\Lookup\ReviewStatus;
use App\Models\Manager;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApplicationReviewControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testBatchUpdate()
    {
        $manager = factory(Manager::class)->states('upgraded')->create();
        $jobPoster = factory(JobPoster::class)->states('closed')->create([
            'manager_id' => $manager->id
        ]);
        $applications = factory(JobApplication::class, 5)->states('submitted')->create([
            'job_poster_id' => $jobPoster->id
        ])->each(function ($application): void {
            $application->application_review()->save(factory(ApplicationReview::class)->make());
        });

        $applicationReviews = ApplicationReview::whereIn('job_application_id', $applications->pluck('id')->all())->get();
        foreach ($applicationReviews as $applicationReview) {
            $applicationReview->fill(['review_status_id' => ReviewStatus::where('name', 'still_in')->first()->id]);
        }

        $response = $this->actingAs($manager->user)
            ->postJson('api/v2/application-reviews/batch-update', $applicationReviews->toArray());
        $response->assertOk();
        $applicationReviews = $applicationReviews->makeHidden(['review_status', 'created_at', 'updated_at'])->toArray();
        $responseJson = $response->decodeResponseJson();
        for ($i = 0; $i < count($responseJson); $i++) {
            $this->assertTrue($responseJson[$i]['id'] === $applicationReviews[$i]['id']);
            $this->assertTrue($responseJson[$i]['job_application_id'] === $applicationReviews[$i]['job_application_id']);
            $this->assertTrue($responseJson[$i]['notes'] === $applicationReviews[$i]['notes']);
            $this->assertTrue($responseJson[$i]['review_status_id'] === $applicationReviews[$i]['review_status_id']);
            $this->assertDatabaseHas('application_reviews', $applicationReviews[$i]);
        }
    }

    public function testUnauthorizedBatchUpdate()
    {
        $response = $this->postJson('api/v2/application-reviews/batch-update', ['data']);
        $response->assertStatus(403);
    }

    public function testInvalidBatchUpdate()
    {
        $manager = factory(Manager::class)->states('upgraded')->create();
        $jobPoster = factory(JobPoster::class)->states('closed')->create([
            'manager_id' => $manager->id
        ]);
        $applications = factory(JobApplication::class, 5)->states('submitted')->create([
            'job_poster_id' => $jobPoster->id
        ])->each(function ($application): void {
            $application->application_review()->save(factory(ApplicationReview::class)->make());
        });

        $applicationReviews = ApplicationReview::whereIn('job_application_id', $applications->pluck('id')->all())->get();
        // Validations rules are in App\Http\Requests\BatchUpdateApplicationReview.
        foreach ($applicationReviews as $applicationReview) {
            $applicationReview->fill([
                'review_status_id' => 999,
                'notes' => 999
            ]);
        }

        $response = $this->actingAs($manager->user)
            ->postJson('api/v2/application-reviews/batch-update', $applicationReviews->toArray());
        $response->assertStatus(422);
    }
}
