<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobPosterStatusHistories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('job_poster_status_histories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('job_poster_id');
            $table->integer('user_id')->nullable();
            $table->integer('from_job_poster_status_id');
            $table->integer('to_job_poster_status_id');
            $table->timestamps();

            $table->foreign('job_poster_id')->references('id')->on('job_posters')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign('from_job_poster_status_id')->references('id')->on('job_poster_status')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign('to_job_poster_status_id')->references('id')->on('job_poster_status')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('job_poster_status_histories');
    }
}
