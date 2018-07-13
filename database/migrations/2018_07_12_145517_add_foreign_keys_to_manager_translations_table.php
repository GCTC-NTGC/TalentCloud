<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToManagerTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('manager_translations', function(Blueprint $table)
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
		Schema::table('manager_translations', function(Blueprint $table)
		{
			$table->dropForeign('manager_translations_manager_id_foreign');
		});
	}

}
