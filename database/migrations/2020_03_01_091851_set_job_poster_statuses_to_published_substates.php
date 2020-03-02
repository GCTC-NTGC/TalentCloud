<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SetJobPosterStatusesToPublishedSubstates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $publishedId = DB::table('job_poster_status')->where('name', 'published')->first()->id;
        $readyId = DB::table('job_poster_status')->where('name', 'ready')->first()->id;
        $liveId = DB::table('job_poster_status')->where('name', 'live')->first()->id;
        $assessmentId = DB::table('job_poster_status')->where('name', 'assessment')->first()->id;

        $now = Date::now();

        // If open date has not been reach, 'published' poster becomes 'ready'.
        DB::table('job_posters')->where('job_poster_status_id', $publishedId)
            ->where('open_date_time', '>=', $now)
            ->update(['job_poster_status_id' => $readyId]);
        // If the close date has passed, 'published' poster becomes 'assessment'.
        DB::table('job_posters')->where('job_poster_status_id', $publishedId)
            ->where('close_date_time', '<=', $now)
            ->update(['job_poster_status_id' => $assessmentId]);
        // All remaining 'published' posters are live.
        DB::table('job_posters')->where('job_poster_status_id', $publishedId)
            ->update(['job_poster_status_id' => $liveId]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $publishedId = DB::table('job_poster_status')->where('name', 'published')->first()->id;
        $readyId = DB::table('job_poster_status')->where('name', 'ready')->first()->id;
        $liveId = DB::table('job_poster_status')->where('name', 'live')->first()->id;
        $assessmentId = DB::table('job_poster_status')->where('name', 'assessment')->first()->id;

        DB::table('job_posters')->whereIn('job_poster_status_id', [$readyId, $liveId, $assessmentId])
            ->update(['job_poster_status_id' => $publishedId]);
    }
}
