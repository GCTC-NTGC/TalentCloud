<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RecreateAssessmentsTableWithoutScreeningPlan extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('assessments');

        Schema::create('assessments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('criterion_id');
            $table->integer('assessment_type_id');
            $table->timestamps();

            $table->unique(['criterion_id', 'assessment_type_id']);

            $table->foreign('criterion_id')->references('id')->on('criteria')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign('assessment_type_id')->references('id')->on('assessment_types')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('assessments');

        Schema::create('assessments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('screening_plan_id');
            $table->integer('criterion_id');
            $table->integer('assessment_type_id');
            $table->timestamps();

            $table->unique(['screening_plan_id', 'criterion_id', 'assessment_type_id']);

            $table->foreign('screening_plan_id')->references('id')->on('screening_plans')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('criterion_id')->references('id')->on('criteria')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign('assessment_type_id')->references('id')->on('assessment_types')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }
}
