<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToCriteriaTypeTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('criteria_type_translations', function(Blueprint $table)
		{
			$table->foreign('criteria_type_id')->references('id')->on('criteria_types')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('criteria_type_translations', function(Blueprint $table)
		{
			$table->dropForeign('criteria_type_translations_criteria_type_id_foreign');
		});
	}

}
