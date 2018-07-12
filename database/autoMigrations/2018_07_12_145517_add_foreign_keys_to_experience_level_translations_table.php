<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToExperienceLevelTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('experience_level_translations', function(Blueprint $table)
		{
			$table->foreign('experience_level_id')->references('id')->on('experience_levels')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('experience_level_translations', function(Blueprint $table)
		{
			$table->dropForeign('experience_level_translations_experience_level_id_foreign');
		});
	}

}
