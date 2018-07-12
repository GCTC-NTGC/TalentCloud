<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToTeamCulturesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('team_cultures', function(Blueprint $table)
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
		Schema::table('team_cultures', function(Blueprint $table)
		{
			$table->dropForeign('team_cultures_manager_id_foreign');
		});
	}

}
