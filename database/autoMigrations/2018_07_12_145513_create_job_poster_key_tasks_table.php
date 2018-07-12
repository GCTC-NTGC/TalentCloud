<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateJobPosterKeyTasksTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('job_poster_key_tasks', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('job_poster_id')->unsigned()->index();
			$table->string('locale', 50);
			$table->text('description', 65535);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('job_poster_key_tasks');
	}

}
