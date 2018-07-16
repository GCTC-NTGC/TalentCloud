<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateWorkplacePhotoCaptionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('workplace_photo_captions', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('work_environment_id')->unsigned()->index();
			$table->string('photo_name');
			$table->integer('workplace_photo_id')->unsigned()->unique()->nullable()->index();
			$table->text('description')->nullable();
			$table->timestamps();

			$table->unique(['work_environment_id','photo_name']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('workplace_photo_captions');
	}

}
