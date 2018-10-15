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
			$table->string('locale');
			$table->text('city')->nullable();
			$table->text('title')->nullable();
			$table->text('impact')->nullable();
			$table->text('branch')->nullable();
			$table->text('division')->nullable();
			$table->text('education')->nullable();
			$table->timestamps();

			$table->unique(['job_poster_id','locale']);
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
