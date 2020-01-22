<?php

use App\Models\Comment;
use App\Models\JobPoster;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder // phpcs:ignore
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $job_posters = JobPoster::all();

        foreach ($job_posters as $job_poster) {
            $job_poster->comments()->saveMany(factory(Comment::class, 3)->make([
                'job_poster_id' => $job_poster->id,
                'user_id' => $job_poster->manager->user_id,
            ]));
        }
    }
}
