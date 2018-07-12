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
			$table->string('photo_name')->nullable();
			$table->integer('workplace_photo_id')->unsigned()->nullable()->index();
			$table->text('description')->nullable();
			$table->timestamps();
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
