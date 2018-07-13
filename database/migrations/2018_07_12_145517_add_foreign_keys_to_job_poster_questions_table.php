<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToJobPosterQuestionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('job_poster_questions', function(Blueprint $table)
		{
			$table->foreign('job_poster_id')->references('id')->on('job_posters')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('job_poster_questions', function(Blueprint $table)
		{
			$table->dropForeign('job_poster_questions_job_poster_id_foreign');
		});
	}

}
