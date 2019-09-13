<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateManagersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('managers', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('government_email')->nullable();
			$table->integer('department_id')->unsigned()->nullable()->index();
			$table->string('twitter_username')->nullable();
			$table->string('linkedin_username')->nullable();
			$table->integer('user_id')->unsigned()->unique()->index();
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
		Schema::drop('managers');
	}

}
