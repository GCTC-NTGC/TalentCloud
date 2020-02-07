<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InitializeJobPosterStatusOnJobPosters extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $reviewId = DB::table('job_poster_status')->where('name', 'review_hr')->first()->id;
        $publishedId = DB::table('job_poster_status')->where('name', 'published')->first()->id;

        DB::table('job_posters')->whereNotNull('published_at')->update(['job_poster_status_id' => $publishedId]);
        DB::table('job_posters')->whereNull('published_at')->whereNotNull('review_requested_at')->update(['job_poster_status_id' => $reviewId]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $draftId = DB::table('job_poster_status')->where('name', 'draft')->first()->id;
        DB::table('job_posters')->update(['job_poster_status_id' => $draftId]);
    }
}
