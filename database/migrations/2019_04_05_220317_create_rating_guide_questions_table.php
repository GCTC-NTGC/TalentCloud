<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRatingGuideQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('rating_guide_questions', function (Blueprint $table): void {
            $table->increments('id');
            $table->timestamps();
            $table->integer('job_poster_id')->unsigned();
            $table->integer('assessment_type_id')->unsigned();
            $table->string('question')->nullable();

            $table->foreign('job_poster_id')->references('id')->on('job_posters')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('assessment_type_id')->references('id')->on('assessment_types')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('rating_guide_questions');
    }
}
