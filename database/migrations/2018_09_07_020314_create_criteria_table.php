<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCriteriaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('criteria', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('criteria_type_id')->unsigned();
			$table->integer('job_poster_id')->unsigned();
            $table->integer('skill_id')->unsigned();
            $table->integer('skill_level_id')->unsigned();
			$table->timestamps();
        });

        Schema::table('criteria', function (Blueprint $table) {
            $table->foreign('criteria_type_id')->references('id')->on('criteria_types')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('job_poster_id')->references('id')->on('job_posters')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('skill_id')->references('id')->on('skills')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('skill_level_id')->references('id')->on('skill_levels')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('criteria');
    }
}
