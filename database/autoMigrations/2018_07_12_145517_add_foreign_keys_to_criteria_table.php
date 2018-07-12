<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToCriteriaTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('criteria', function(Blueprint $table)
		{
			$table->foreign('criteria_type_id')->references('id')->on('criteria_types')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('job_poster_id')->references('id')->on('job_posters')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('criteria', function(Blueprint $table)
		{
			$table->dropForeign('criteria_criteria_type_id_foreign');
			$table->dropForeign('criteria_job_poster_id_foreign');
		});
	}

}
