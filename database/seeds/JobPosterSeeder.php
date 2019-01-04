<?php

use Illuminate\Database\Seeder;
use App\Models\Criteria;
use App\Models\JobPoster;
use App\Models\JobPosterKeyTask;
use App\Models\JobPosterQuestion;

class JobPosterSeeder extends Seeder //phpcs:ignore
{
    /**
     * Run the Job Poster table seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(JobPoster::class, 5)->create()->each(function ($jp) {
            $jp->criteria()->saveMany(factory(Criteria::class, 2)->make([
                'job_poster_id' => $jp->id
            ]));
            $jp->job_poster_key_tasks()->saveMany(factory(JobPosterKeyTask::class, 2)->make([
                'job_poster_id' => $jp->id
            ]));
            $jp->job_poster_questions()->saveMany(factory(JobPosterQuestion::class, 2)->make([
                'job_poster_id' => $jp->id
            ]));
        });
    }
}
