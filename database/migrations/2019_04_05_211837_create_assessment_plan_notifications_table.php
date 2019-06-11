<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAssessmentPlanNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assessment_plan_notifications', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('job_poster_id')->unsigned();
            $table->string('type');
            $table->integer('criteria_id')->unsigned();
            $table->integer('criteria_type_id')->unsigned();
            $table->integer('skill_id')->unsigned();
            $table->integer('skill_id_new')->unsigned()->nullable();
            $table->integer('skill_level_id')->unsigned();
            $table->integer('skill_level_id_new')->unsigned()->nullable();

            $table->boolean('acknowledged')->default(false);

            // criteria_id cannot have a foreign key constraing, because this object is expected to last after the matching criteria is delete
            $table->foreign('job_poster_id')->references('id')->on('job_posters')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('skill_id')->references('id')->on('skills')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign('skill_id_new')->references('id')->on('skills')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign('criteria_type_id')->references('id')->on('criteria_types')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign('skill_level_id')->references('id')->on('skill_levels')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign('skill_level_id_new')->references('id')->on('skill_levels')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *]
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('assessment_plan_notifications');
    }
}
