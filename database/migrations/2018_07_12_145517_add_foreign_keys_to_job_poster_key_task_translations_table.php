<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToJobPosterKeyTaskTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('job_poster_key_task_translations', function(Blueprint $table)
		{
			$table->foreign('job_poster_key_task_id')->references('id')->on('job_poster_key_tasks')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('job_poster_key_task_translations', function(Blueprint $table)
		{
			$table->dropForeign('job_poster_key_task_translations_job_poster_key_task_id_foreign');
		});
	}

}
