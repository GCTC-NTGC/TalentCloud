<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddExperienceSkillTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('experience_skills', function (Blueprint $table) {
            $table->integer('skill_id')->unsigned()->index();
            $table->integer('experience_id')->unsigned()->index();
            $table->string('experience_type');
            $table->text('justification');
            $table->timestamps();
        });

        Schema::table('experience_skills', function (Blueprint $table) {
            $table->foreign('skill_id')
                ->references('id')
                ->on('skills')
                ->onUpdate('CASCADE')
                ->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('experience_skills');
    }
}
