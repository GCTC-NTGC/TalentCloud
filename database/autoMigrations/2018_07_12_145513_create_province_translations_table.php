<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProvinceTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('province_translations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('province_id')->unsigned()->index();
			$table->string('locale', 50);
			$table->string('value', 45);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('province_translations');
	}

}
