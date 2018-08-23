<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToWorkEnvironmentsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('work_environments', function(Blueprint $table)
		{
			$table->foreign('manager_id')->references('id')->on('managers')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('work_environments', function(Blueprint $table)
		{
			$table->dropForeign('work_environments_manager_id_foreign');
		});
	}

}
