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
    public function up(): void
    {
        Schema::create('rating_guide_answers', function (Blueprint $table): void {
            $table->increments('id');
            $table->timestamps();
            $table->integer('rating_guide_question_id')->unsigned();
            $table->integer('criterion_id')->nullable()->unsigned();
            $table->string('expected_answer')->nullable();

            $table->unique(['rating_guide_question_id', 'criterion_id']);
            $table->foreign('rating_guide_question_id')->references('id')->on('rating_guide_questions')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('criterion_id')->references('id')->on('criteria')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('rating_guide_answers');
    }
}
