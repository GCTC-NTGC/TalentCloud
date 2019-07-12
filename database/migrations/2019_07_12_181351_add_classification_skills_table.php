<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddClassificationSkillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('classification_skills', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('skill_id')->unsigned()->nullable();
            $table->integer('classification_id')->unsigned()->nullable();
            $table->timestamps();
        });

        Schema::table('classification_skills', function (Blueprint $table) {
            $table->foreign('skill_id')->references('id')->
                on('skills')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('classification_id')->references('id')->
                on('classifications')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('classification_skills');
    }
}
