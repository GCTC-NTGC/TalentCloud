<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRatingGuideAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rating_guide_answers', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('rating_guide_question_id')->unsigned();
            $table->integer('skill_id')->unsigned();
            $table->string('expected_answer')->nullable();

            $table->unique(['rating_guide_question_id', 'skill_id']);
            $table->foreign('rating_guide_question_id')->references('id')->on('rating_guide_questions')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('skill_id')->references('id')->on('skills')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rating_guide_answers');
    }
}
