<?php

namespace Tests\Feature\Api;

use App\Models\Comment;
use App\Models\HrAdvisor;
use App\Models\JobPoster;
use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CommentControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Base route for the API calls.
     *
     * @var string
     */
    protected $baseUrl;

    /**
     * Run parent setup and set global values.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->baseUrl = 'api/v1';
    }

    /**
     * Manager should be able to get index of comments on job poster.
     *
     * @return void
     */
    public function testIndexByJobForManager(): void
    {
        // Factories.
        $job = factory(JobPoster::class)->create();
        $job->comments()->saveMany(factory(Comment::class, 3)->make(['job_poster_id' => $job->id, 'user_id' => $job->manager->user->id]));

        // Get comments from job poster.
        $response = $this->followingRedirects()
            ->actingAs($job->manager->user)
            ->json('get', "$this->baseUrl/jobs/$job->id/comments");
        $response->assertOk();
        $expectedComments = Comment::where('job_poster_id', $job->id)->get()->toArray();
        $response->assertJson($expectedComments);
    }

    /**
     * Hr Advisor should be able to get index of comments on job poster.
     *
     * @return void
     */
    public function testIndexByJobForAdvisor(): void
    {
        // Factories.
        $job = factory(JobPoster::class)->states(['byUpgradedManager', 'review_requested'])->create();
        $user = factory(User::class)->create([
            'department_id' => $job->department_id,
            'user_role_id' => 4
        ]);
        $hrAdvisor = factory(HrAdvisor::class)->create([
            'user_id' => $user->id
        ]);
        $hrAdvisor->claimed_jobs()->save($job);
        $job->comments()->saveMany(factory(Comment::class, 3)->make([
            'job_poster_id' => $job->id,
            'user_id' => $hrAdvisor->user->id
        ]));

        // Get comments from job poster.
        $response = $this->followingRedirects()
            ->actingAs($job->hr_advisors->first()->user)
            ->json('get', "$this->baseUrl/jobs/$job->id/comments");
        $response->assertOk();
        $expectedComments = Comment::where('job_poster_id', $job->id)->get()->toArray();
        $response->assertJson($expectedComments);
    }

    /**
     * Unauthorized user should not be able to get index of comments on job poster.
     *
     * @return void
     */
    public function testIndexByJobFailsForUnauthorizedUser(): void
    {
        // Factories.
        $job = factory(JobPoster::class)->create();
        $job->comments()->saveMany(factory(Comment::class, 3)->make(['job_poster_id' => $job->id, 'user_id' => $job->manager->user->id]));

        // Get comments from job poster.
        $response = $this->followingRedirects()
            ->json('get', "$this->baseUrl/jobs/$job->id/comments");
        $response->assertStatus(403);
    }

    public function testStoreCommentAsManager(): void
    {
        $job = factory(JobPoster::class)->states(['byUpgradedManager', 'draft'])->create();
        $newComment = factory(Comment::class)->make(['job_poster_id' => $job->id, 'user_id' => $job->manager->user->id])->toArray();

        $response = $this->actingAs($job->manager->user)
            ->json('post', "$this->baseUrl/jobs/$job->id/comments", $newComment);
        $response->assertOk();
        $this->assertDatabaseHas('comments', $newComment);
    }

    public function testStoreCommentAsAdvisor(): void
    {
        $job = factory(JobPoster::class)->states(['byUpgradedManager', 'review_requested'])->create();
        $user = factory(User::class)->create([
            'department_id' => $job->department_id,
            'user_role_id' => 4
        ]);
        $hrAdvisor = factory(HrAdvisor::class)->create([
            'user_id' => $user->id
        ]);
        $hrAdvisor->claimed_jobs()->attach($job->id);
        $job->comments()->saveMany(factory(Comment::class, 3)->make([
            'job_poster_id' => $job->id,
            'user_id' => $job->hr_advisors->first()->user->id
        ]));
        $newComment = factory(Comment::class)->make([
            'job_poster_id' => $job->id,
            'user_id' => $job->hr_advisors->first()->user
        ])->toArray();

        $response = $this->actingAs($job->hr_advisors->first()->user)
            ->json('post', "$this->baseUrl/jobs/$job->id/comments", $newComment);
        $response->assertOk();
        $this->assertDatabaseHas('comments', $newComment);
    }

    public function testStoreCommentFailsForUnauthorizedUser(): void
    {
        // Factories.
        $job = factory(JobPoster::class)->create();
        $newComment = factory(Comment::class)->make(['job_poster_id' => $job->id, 'user_id' => $job->manager->user->id])->toArray();

        // Store comment in db with unauthorized user
        $response = $this->json('post', "$this->baseUrl/jobs/$job->id/comments", $newComment);
        $response->assertStatus(403);
    }
}
