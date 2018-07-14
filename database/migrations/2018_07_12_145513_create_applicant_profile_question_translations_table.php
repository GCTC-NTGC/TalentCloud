<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateApplicantProfileQuestionTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
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
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('applicant_profile_question_translations');
	}

}
