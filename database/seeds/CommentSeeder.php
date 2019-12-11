<?php

use App\Models\JobPoster;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $job_posters = JobPoster::all();

        $job_posters->each(function ($job_poster) {
            $job_poster->comments()->save(factory(App\Models\Comment::class)->make());
        });
    }
}
