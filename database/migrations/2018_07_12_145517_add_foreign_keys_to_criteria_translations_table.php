<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToCriteriaTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('criteria_translations', function(Blueprint $table)
		{
			$table->foreign('criteria_id')->references('id')->on('criteria')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('criteria_translations', function(Blueprint $table)
		{
			$table->dropForeign('criteria_translations_criteria_id_foreign');
		});
	}

}
