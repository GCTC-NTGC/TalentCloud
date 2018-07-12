<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToRelationshipTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('relationship_translations', function(Blueprint $table)
		{
			$table->foreign('relationship_id')->references('id')->on('relationships')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('relationship_translations', function(Blueprint $table)
		{
			$table->dropForeign('relationship_translations_relationship_id_foreign');
		});
	}

}
