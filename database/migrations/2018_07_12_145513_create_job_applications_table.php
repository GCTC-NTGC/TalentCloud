<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateJobApplicationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('job_applications', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('job_poster_id')->unsigned();
			$table->integer('application_status_id')->unsigned();
			$table->integer('applicant_id')->unsigned();
			$table->integer('applicant_snapshot_id')->unsigned()->nullable();
			$table->integer('citizenship_declaration_id')->unsigned()->nullable();
			$table->integer('veteran_status_id')->unsigned()->nullable();
			$table->integer('preferred_language_id')->unsigned()->nullable();
                        $table->string('submission_signature')->nullable();
                        $table->string('submission_date')->nullable();
			$table->timestamps();

			$table->unique(['job_poster_id','applicant_id']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('job_applications');
	}

}
