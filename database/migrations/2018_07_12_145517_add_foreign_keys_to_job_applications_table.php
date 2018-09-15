<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToJobApplicationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('job_applications', function(Blueprint $table)
		{
			$table->foreign('applicant_id')->references('id')->on('applicants')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('applicant_snapshot_id')->references('id')->on('applicants')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('application_status_id')->references('id')->on('application_status')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('job_poster_id')->references('id')->on('job_posters')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('citizenship_declaration_id')->references('id')->on('citizenship_declarations')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('veteran_status_id')->references('id')->on('veteran_statuses')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('preferred_language_id')->references('id')->on('preferred_languages')->onUpdate('CASCADE')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('job_applications', function(Blueprint $table)
		{
			$table->dropForeign('job_applications_applicant_id_foreign');
			$table->dropForeign('job_applications_applicant_snapshot_id_foreign');
			$table->dropForeign('job_applications_application_status_id_foreign');
			$table->dropForeign('job_applications_job_poster_id_foreign');
			$table->dropForeign('job_applications_citizenship_declaration_id_foreign');
			$table->dropForeign('job_applications_veteran_status_id_foreign');
			$table->dropForeign('job_applications_preferred_language_id_foreign');
		});
	}

}
