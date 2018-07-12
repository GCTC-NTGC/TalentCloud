<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToSkillLevelTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('skill_level_translations', function(Blueprint $table)
		{
			$table->foreign('skill_level_id')->references('id')->on('skill_levels')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('skill_level_translations', function(Blueprint $table)
		{
			$table->dropForeign('skill_level_translations_skill_level_id_foreign');
		});
	}

}
