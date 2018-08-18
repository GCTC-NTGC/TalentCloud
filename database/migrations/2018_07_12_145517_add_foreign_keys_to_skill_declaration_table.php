<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToSkillDeclarationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('skill_declarations', function(Blueprint $table)
		{
			$table->foreign('job_application_id')->references('id')->on('job_applications')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('criteria_id')->references('id')->on('criteria')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('experience_level_id')->references('id')->on('experience_levels')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('skill_level_id')->references('id')->on('skill_levels')->onUpdate('CASCADE')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('skill_declarations', function(Blueprint $table)
		{
			$table->dropForeign('skill_declarations_job_application_id_foreign');
			$table->dropForeign('skill_declarations_criteria_id_foreign');
			$table->dropForeign('skill_declarations_experience_level_id_foreign');
			$table->dropForeign('skill_declarations_skill_level_id_foreign');
		});
	}

}
