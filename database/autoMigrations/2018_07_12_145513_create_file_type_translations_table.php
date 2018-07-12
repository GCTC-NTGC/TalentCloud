<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateFileTypeTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('file_type_translations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('file_type_id')->unsigned()->index();
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
		Schema::drop('file_type_translations');
	}

}
