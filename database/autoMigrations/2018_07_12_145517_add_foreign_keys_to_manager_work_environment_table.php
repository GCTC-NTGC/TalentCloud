<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToManagerWorkEnvironmentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('manager_work_environment', function(Blueprint $table)
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
		Schema::table('manager_work_environment', function(Blueprint $table)
		{
			$table->dropForeign('manager_work_environment_manager_id_foreign');
		});
	}

}
