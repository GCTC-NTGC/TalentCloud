<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCityTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('city_translations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('city_id')->unsigned()->index();
			$table->string('locale', 50);
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
		Schema::drop('city_translations');
	}

}
