<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateWorkplacePhotosTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('workplace_photos', function(Blueprint $table)
		{
			$table->increments('id');
			$table->binary('image');
			$table->string('mime_type', 45);
			$table->integer('size');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('workplace_photos');
	}

}
