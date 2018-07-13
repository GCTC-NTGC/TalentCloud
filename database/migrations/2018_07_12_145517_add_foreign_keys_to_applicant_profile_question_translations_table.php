<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToApplicantProfileQuestionTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('applicant_profile_question_translations', function(Blueprint $table)
		{
			//Custom foreign key name because default exceeds length limit  
			$table->foreign('applicant_profile_question_id', 'applicant_profile_question_trans_applicant_profile_question_fk')->references('id')->on('applicant_profile_questions')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('applicant_profile_question_translations', function(Blueprint $table)
		{
			//Custom foreign key name because default exceeds length limit
			$table->dropForeign('applicant_profile_question_trans_applicant_profile_question_fk');
		});
	}

}
