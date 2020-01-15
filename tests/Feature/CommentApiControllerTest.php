<?php

namespace Tests\Unit;

use App\Http\Controllers\Api\CommentApiController;
use App\Models\Comment;
use App\Models\HrAdvisor;
use App\Models\JobPoster;
use App\Models\Manager;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Log;

class CommentApiControllerTest extends TestCase
{
    use RefreshDatabase;

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
            ->json('get', "api/jobs/$job->id/comments");
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
        $job = factory(JobPoster::class)->make();
        $job->hr_advisors()->saveMany(factory(HrAdvisor::class, 3)->make([ 'department_id' => $job->department_id])->each(function ($hr_advisor) use ($job) {
            $hr_advisor->claimed_jobs()->save($job);
        }));
        $job->comments()->saveMany(factory(Comment::class, 3)->make(['job_poster_id' => $job->id, 'user_id' => $job->hr_advisors()->first()->user->id]));

        // Get comments from job poster.
        $response = $this->followingRedirects()
            ->actingAs($job->hr_advisors->first()->user)
            ->json('get', "api/jobs/$job->id/comments");
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
            ->json('get', "api/jobs/$job->id/comments");
        $response->assertStatus(403);
    }

    public function testStoreCommentAsManager(): void
    {
        $job = factory(JobPoster::class)->states(['byUpgradedManager', 'draft'])->create();
        $newComment = factory(Comment::class)->make(['job_poster_id' => $job->id, 'user_id' => $job->manager->user->id])->toArray();

        $response = $this->actingAs($job->manager->user)
            ->json('post', "api/jobs/$job->id/comments", $newComment);
        $response->assertOk();
        $this->assertDatabaseHas('comments', $newComment);
    }

    public function testStoreCommentAsAdvisor(): void
    {
        $job = factory(JobPoster::class)->create();
        $job->hr_advisors()->saveMany(factory(HrAdvisor::class, 3)->make([ 'department_id' => $job->department_id])->each(function ($hr_advisor) use ($job) {
            $hr_advisor->claimed_jobs()->attach($job->id);
        }));
        $newComment = factory(Comment::class)->make(['job_poster_id' => $job->id, 'user_id' => $job->hr_advisors->first()->user])->toArray();

        $response = $this->actingAs($job->hr_advisors->first()->user)
            ->json('post', "api/jobs/$job->id/comments", $newComment);
        $response->assertOk();
        $this->assertDatabaseHas('comments', $newComment);
    }

    public function testStoreCommentFailsForUnauthorizedUser(): void
    {
        // Factories.
        $job = factory(JobPoster::class)->create();
        $newComment = factory(Comment::class)->make(['job_poster_id' => $job->id, 'user_id' => $job->manager->user->id])->toArray();

        // Store comment in db with unauthorized user
        $response = $this->json('post', "api/jobs/$job->id/comments", $newComment);
        $response->assertStatus(403);
    }
}
