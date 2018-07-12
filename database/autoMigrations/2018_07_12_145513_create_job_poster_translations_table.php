<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateJobPosterTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('job_poster_translations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('job_poster_id')->unsigned()->index();
			$table->string('locale', 50);
			$table->text('city', 65535);
			$table->text('title', 65535);
			$table->text('impact', 65535);
			$table->text('branch', 65535)->nullable();
			$table->text('division', 65535)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('job_poster_translations');
	}

}
