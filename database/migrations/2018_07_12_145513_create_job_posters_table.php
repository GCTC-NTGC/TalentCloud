<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateJobPostersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('job_posters', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('job_term_id')->unsigned()->nullable();
			$table->integer('term_qty')->unsigned()->nullable();
			$table->dateTime('open_date_time')->nullable();
			$table->dateTime('close_date_time')->nullable();
			$table->dateTime('start_date_time')->nullable();
			$table->integer('department_id')->unsigned()->nullable();
			$table->integer('province_id')->unsigned()->nullable();
			$table->integer('salary_min')->nullable()->nullable();
			$table->integer('salary_max')->nullable()->nullable();
			$table->integer('noc')->nullable();
			$table->string('classification')->nullable();
			$table->integer('security_clearance_id')->unsigned()->index()->nullable();
			$table->integer('language_requirement_id')->unsigned()->index()->nullable();
			$table->integer('manager_id')->unsigned()->index();
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
		Schema::drop('job_posters');
	}

}
