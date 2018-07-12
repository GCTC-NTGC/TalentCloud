<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBaseContentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('base_content', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('base_content_type_id')->unsigned();
			$table->string('key', 64);
			$table->text('value', 65535);
			$table->string('locale', 45);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('base_content');
	}

}
