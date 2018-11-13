<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropApplicantProfileQuestionTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('applicant_profile_question_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('applicant_profile_question_translations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('applicant_profile_question_id')->unsigned()->index('applicant_profile_question_trans_applicant_profile_question_idx'); //Custom index name because exceeds length limit
			$table->string('locale');
			$table->text('value');
			$table->text('description');
			$table->timestamps();

            $table->unique(['applicant_profile_question_id','locale'], 'app_profile_ques_trans_app_profile_question_id_locale_unique');
		});

        Schema::table('applicant_profile_question_translations', function(Blueprint $table)
		{
			//Custom foreign key name because default exceeds length limit  
			$table->foreign('applicant_profile_question_id', 'applicant_profile_question_trans_applicant_profile_question_fk')->references('id')->on('applicant_profile_questions')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
    }
}
