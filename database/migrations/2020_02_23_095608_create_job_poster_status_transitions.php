<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobPosterStatusTransitions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('job_poster_status_transitions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->string('key');
            $table->integer('from_job_poster_status_id');
            $table->integer('to_job_poster_status_id');
            $table->integer('owner_user_role_id');
            $table->json('name');
            $table->json('metadata');

            $table->foreign('from_job_poster_status_id')->references('id')->on('job_poster_status')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign('to_job_poster_status_id')->references('id')->on('job_poster_status')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign('owner_user_role_id')->references('id')->on('user_roles')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('job_poster_status_transitions');
    }
}
