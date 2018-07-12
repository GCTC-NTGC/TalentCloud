<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToSecurityClearanceTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('security_clearance_translations', function(Blueprint $table)
		{
			$table->foreign('security_clearance_id')->references('id')->on('security_clearances')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('security_clearance_translations', function(Blueprint $table)
		{
			$table->dropForeign('security_clearance_translations_security_clearance_id_foreign');
		});
	}

}
