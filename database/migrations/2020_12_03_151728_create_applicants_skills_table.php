<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApplicantsSkillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('applicant_skill', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('applicant_id');
            $table->foreign('applicant_id')
                ->references('id')
                ->on('applicants')
                ->onUpdate('CASCADE')
                ->onDelete('CASCADE');
            $table->integer('skill_id');
            $table->foreign('skill_id')
                ->references('id')
                ->on('skills')
                ->onUpdate('CASCADE')
                ->onDelete('NO ACTION');
            $table->unique(['applicant_id', 'skill_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('applicant_skill');
    }
}
