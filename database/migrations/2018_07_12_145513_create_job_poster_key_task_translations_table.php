<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateJobPosterKeyTaskTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('job_poster_key_task_translations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('job_poster_key_task_id')->unsigned()->index();
			$table->string('locale');
			$table->text('description')->nullable();
			$table->timestamps();

			$table->unique(['job_poster_key_task_id','locale'], 'job_poster_key_task_trans_job_poster_key_task_id_locale_unique');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('job_poster_key_task_translations');
	}

}
