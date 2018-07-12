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
			$table->foreign('applicant_profile_question_id')->references('id')->on('applicant_profile_questions')->onUpdate('CASCADE')->onDelete('CASCADE');
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
			$table->dropForeign('applicant_profile_question_translations_applicant_profile_question_id_foreign');
		});
	}

}
