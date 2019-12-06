<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTranslationsToJobPosterQuestionsAsJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('job_poster_questions', function (Blueprint $table) {
            $table->json('question')->nullable();
            $table->json('description')->nullable();
        });

        $questions = DB::table('job_poster_questions')->get();

        foreach ($questions as $question) {
            $questionTranslationsEnglish = DB::table('job_poster_question_translations')->where('job_poster_question_id', $question->id)->where('locale', 'en')->first();
            $questionTranslationsFrench = DB::table('job_poster_question_translations')->where('job_poster_question_id', $question->id)->where('locale', 'fr')->first();

            $question->question = collect([$questionTranslationsEnglish->locale => $questionTranslationsEnglish->value, $questionTranslationsFrench->locale => $questionTranslationsFrench->value])->toJson();

            $question->description = collect([$questionTranslationsEnglish->locale => $questionTranslationsEnglish->value, $questionTranslationsFrench->locale => $questionTranslationsFrench->value])->toJson();

            DB::table('job_poster_questions')->where('id', $question->id)->update([
                'id' => $question->id,
                'question' => $question->question,
                'description' => $question->description
            ]);
        }

        Schema::drop('job_poster_question_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('job_poster_questions', function (Blueprint $table) {
            $table->dropColumn(['question', 'description']);
        });
    }
}
