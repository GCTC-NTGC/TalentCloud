<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToLanguageRequirementTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('language_requirement_translations', function(Blueprint $table)
		{
			$table->foreign('language_requirement_id')->references('id')->on('language_requirements')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('language_requirement_translations', function(Blueprint $table)
		{
			$table->dropForeign('language_requirement_translations_language_requirement_id_foreign');
		});
	}

}
