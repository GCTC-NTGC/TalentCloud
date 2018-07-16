<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToJobPostersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('job_posters', function(Blueprint $table)
		{
			$table->foreign('department_id')->references('id')->on('departments')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('job_term_id')->references('id')->on('job_terms')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('language_requirement_id')->references('id')->on('language_requirements')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('manager_id')->references('id')->on('managers')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('province_id')->references('id')->on('provinces')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('security_clearance_id')->references('id')->on('security_clearances')->onUpdate('CASCADE')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('job_posters', function(Blueprint $table)
		{
			$table->dropForeign('job_posters_department_id_foreign');
			$table->dropForeign('job_posters_job_term_id_foreign');
			$table->dropForeign('job_posters_language_requirement_id_foreign');
			$table->dropForeign('job_posters_manager_id_foreign');
			$table->dropForeign('job_posters_province_id_foreign');
			$table->dropForeign('job_posters_security_clearance_id_foreign');
		});
	}

}
