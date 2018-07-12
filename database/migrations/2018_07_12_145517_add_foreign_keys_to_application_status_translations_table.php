<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToApplicationStatusTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('application_status_translations', function(Blueprint $table)
		{
			$table->foreign('application_status_id')->references('id')->on('application_status')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('application_status_translations', function(Blueprint $table)
		{
			$table->dropForeign('application_status_translations_application_status_id_foreign');
		});
	}

}
