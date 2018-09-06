<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSkillWorkSamplePivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('skill_work_sample', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('work_sample_id')->unsigned();
            $table->integer('skill_id')->unsigned();
            $table->timestamps();
        });

        Schema::table('skill_work_sample', function (Blueprint $table) {
            $table->foreign('work_sample_id')->references('id')->on('work_samples')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('skill_id')->references('id')->on('skills')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('skill_work_sample');
    }
}
