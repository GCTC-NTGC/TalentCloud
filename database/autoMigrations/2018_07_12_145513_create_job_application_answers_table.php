<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateJobApplicationAnswersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('job_application_answers', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('job_poster_questions_id')->unsigned()->index();
			$table->integer('job_application_id')->unsigned()->index();
			$table->text('answer', 65535);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('job_application_answers');
	}

}
