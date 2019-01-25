<?php

use Illuminate\Database\Seeder;
use App\Models\JobPoster;

class JobPosterSeeder extends Seeder //phpcs:ignore
{
    /**
     * Run the Job Poster table seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(JobPoster::class, 5)->create();
    }
}
