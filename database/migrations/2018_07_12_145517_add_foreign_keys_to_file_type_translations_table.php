<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToFileTypeTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('file_type_translations', function(Blueprint $table)
		{
			$table->foreign('file_type_id')->references('id')->on('file_types')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('file_type_translations', function(Blueprint $table)
		{
			$table->dropForeign('file_type_translations_file_type_id_foreign');
		});
	}

}
