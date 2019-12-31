<?php

namespace Tests\Unit;

use App\Models\Comment;
use App\Models\JobPoster;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CommentTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test one-to-many relationship between job poster and comments
     *
     * @return void
     */
    public function testCommentBelongsToAJobPoster()
    {
        $job_poster = factory(JobPoster::class)->create();
        $comment = factory(Comment::class)->make(['job_poster_id' => $job_poster->id]);

        $this->assertInstanceOf(JobPoster::class, $comment->job_poster);
    }

    /**
     * Test one-to-many relationship between users and comments
     *
     * @return void
     */
    public function testCommentBelongsToAUser()
    {
        $user = factory(User::class)->create();
        $comment = factory(Comment::class)->make(['job_poster_id' => $user->id]);

        $this->assertInstanceOf(User::class, $comment->user);
    }
}
