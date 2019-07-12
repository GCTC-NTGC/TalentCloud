<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddClassificationSkillTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('classification_skill', function (Blueprint $table) {
            // $table->increments('id');
            $table->integer('skill_id')->unsigned()->nullable();
            $table->integer('classification_id')->unsigned()->nullable();
            $table->timestamps();
        });

        Schema::table('classification_skill', function (Blueprint $table) {
            $table->foreign('skill_id')->references('id')->
                on('skills');
            $table->foreign('classification_id')->references('id')->
                on('classifications');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('classification_skill');
    }
}
