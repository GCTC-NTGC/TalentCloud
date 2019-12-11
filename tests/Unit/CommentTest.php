<?php

namespace Tests\Unit;

use App\Models\Comment;
use App\Models\JobPoster;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Schema;
use PHPUnit\Framework\TestCase;

class CommentTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Check if the comments table has the correct columns.
     *
     * @return void
     */
    public function testCommentsDatabaseHasExpectedColumns()
    {
        $this->assertTrue(
            Schema::hasColumns('comments', [
                'id', 'job_poster_id', 'user_id', 'comment', 'location', 'type_id', 'created_at', 'updated_at'
            ]),
            1
        );
    }

    /**
     * Test one-to-many relationship between job poster and comments
     *
     * @return void
     */
    public function testCommentBelongsToAJobPoster()
    {
        $job_poster = factory(JobPoster::class)->create();
        $comment = factory(Comment::class)->make(['job_poster_id' => $job_poster->id]);

        $this->assertInstanceOf(JobPoster::class, $comment->job_poster_id);
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
