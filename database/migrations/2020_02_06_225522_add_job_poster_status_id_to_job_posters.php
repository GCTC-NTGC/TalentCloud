<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddJobPosterStatusIdToJobPosters extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $draftId = DB::table('job_poster_status')->where('name', 'draft')->firstOrFail()->id;

        Schema::table('job_posters', function (Blueprint $table) use ($draftId){
            $table->integer('job_poster_status_id')->default($draftId);
            $table->foreign('job_poster_status_id')->references('id')->on('job_poster_status')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('job_posters', function (Blueprint $table) {
            $table->dropForeign(['job_poster_status_id']);
            $table->dropColumn('job_poster_status_id');
        });
    }
}
