<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToCitizenshipDeclarationTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('citizenship_declaration_translations', function(Blueprint $table)
		{
			$table->foreign('citizenship_declaration_id')->references('id')->on('citizenship_declaration')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('citizenship_declaration_translations', function(Blueprint $table)
		{
			$table->dropForeign('citizenship_declaration_translations_citizenship_declaration_id_foreign');
		});
	}

}
