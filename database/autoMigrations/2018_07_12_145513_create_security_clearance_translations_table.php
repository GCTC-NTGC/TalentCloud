<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSecurityClearanceTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('security_clearance_translations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('locale', 50);
			$table->integer('security_clearance_id')->unsigned()->index();
			$table->string('value', 65);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('security_clearance_translations');
	}

}
