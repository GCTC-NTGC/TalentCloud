<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToApplicationWorkSamplesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('application_work_samples', function(Blueprint $table)
		{
			$table->foreign('job_application_id')->references('id')->on('job_applications')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('criteria_id')->references('id')->on('criteria')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('work_sample_id')->references('id')->on('work_samples')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('application_work_samples', function(Blueprint $table)
		{
			$table->dropForeign('application_work_samples_job_application_id_foreign');
			$table->dropForeign('application_work_samples_criteria_id_foreign');
			$table->dropForeign('application_work_samples_work_sample_id_foreign');
		});
	}

}
