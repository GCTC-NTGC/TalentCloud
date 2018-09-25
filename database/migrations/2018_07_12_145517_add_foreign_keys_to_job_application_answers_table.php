<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToJobApplicationAnswersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('job_application_answers', function(Blueprint $table)
		{
			$table->foreign('job_application_id')->references('id')->on('job_applications')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('job_poster_question_id')->references('id')->on('job_poster_questions')->onUpdate('CASCADE')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('job_application_answers', function(Blueprint $table)
		{
			$table->dropForeign('job_application_answers_job_application_id_foreign');
			$table->dropForeign('job_application_answers_job_poster_question_id_foreign');
		});
	}

}
