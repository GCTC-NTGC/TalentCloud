<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateApplicationWorkSamplesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('application_work_samples', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('job_application_id')->unsigned()->index();
			$table->integer('criteria_id')->unsigned()->index();
			$table->integer('work_sample_id')->unsigned()->index();
			$table->boolean('is_active')->default(1);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('application_work_samples');
	}

}
