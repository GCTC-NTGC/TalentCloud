<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateWorkEnvironmentsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('work_environments', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('manager_id')->unsigned()->unique()->index();
			$table->string('remote_allowed')->nullable();
			$table->string('telework_allowed')->nullable();
			$table->string('flexible_allowed')->nullable();
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
		Schema::drop('work_environments');
	}

}
