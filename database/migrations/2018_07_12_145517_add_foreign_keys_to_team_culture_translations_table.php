<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToTeamCultureTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('team_culture_translations', function(Blueprint $table)
		{
			$table->foreign('team_culture_id')->references('id')->on('team_cultures')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('team_culture_translations', function(Blueprint $table)
		{
			$table->dropForeign('team_culture_translations_team_culture_id_foreign');
		});
	}

}
