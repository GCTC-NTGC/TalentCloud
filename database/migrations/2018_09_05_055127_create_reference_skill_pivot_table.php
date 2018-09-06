<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReferenceSkillPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reference_skill', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('reference_id')->unsigned();
            $table->integer('skill_id')->unsigned();
            $table->timestamps();
        });

        Schema::table('reference_skill', function (Blueprint $table) {
            $table->foreign('reference_id')->references('id')->on('references')->onUpdate('CASCADE')->onDelete('CASCADE');
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
        Schema::dropIfExists('reference_skill');
    }
}
