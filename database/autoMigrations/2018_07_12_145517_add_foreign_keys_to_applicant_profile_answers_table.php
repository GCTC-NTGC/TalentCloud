<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToApplicantProfileAnswersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('applicant_profile_answers', function(Blueprint $table)
		{
			$table->foreign('applicant_profile_question_id')->references('id')->on('applicant_profile_questions')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('applicant_id')->references('id')->on('applicants')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('applicant_profile_answers', function(Blueprint $table)
		{
			$table->dropForeign('applicant_profile_answers_applicant_profile_question_id_foreign');
			$table->dropForeign('applicant_profile_answers_applicant_id_foreign');
		});
	}

}
