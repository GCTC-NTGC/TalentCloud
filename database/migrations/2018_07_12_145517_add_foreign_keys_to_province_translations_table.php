<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToProvinceTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('province_translations', function(Blueprint $table)
		{
			$table->foreign('province_id')->references('id')->on('provinces')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('province_translations', function(Blueprint $table)
		{
			$table->dropForeign('province_translations_province_id_foreign');
		});
	}

}
