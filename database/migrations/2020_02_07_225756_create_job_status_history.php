<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobStatusHistory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('job_poster_status_history', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('job_poster_id');
            $table->integer('user_id');
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
        Schema::dropIfExists('job_status_history');
    }
}
