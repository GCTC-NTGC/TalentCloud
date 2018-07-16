<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToApplicationMicroReferencesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('application_micro_references', function(Blueprint $table)
		{
			$table->foreign('job_application_id')->references('id')->on('job_applications')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('criteria_id')->references('id')->on('criteria')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('micro_reference_id')->references('id')->on('micro_references')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('application_micro_references', function(Blueprint $table)
		{
			$table->dropForeign('application_micro_references_job_application_id_foreign');
			$table->dropForeign('application_micro_references_criteria_id_foreign');
			$table->dropForeign('application_micro_references_micro_reference_id_foreign');
		});
	}

}
