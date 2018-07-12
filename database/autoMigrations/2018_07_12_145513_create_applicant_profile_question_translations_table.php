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
			$table->integer('applicant_profile_question_id')->unsigned()->index();
			$table->string('locale');
			$table->text('value');
			$table->text('description');
			$table->timestamps();
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
