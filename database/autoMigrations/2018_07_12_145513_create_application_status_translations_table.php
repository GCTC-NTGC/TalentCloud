<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateApplicationStatusTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('application_status_translations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('application_status_id')->unsigned()->index();
			$table->string('locale', 45);
			$table->string('value', 45)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('application_status_translations');
	}

}
