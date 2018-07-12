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
			$table->string('remote_allowed', 45);
			$table->string('telework_allowed', 45);
			$table->string('flexible_allowed', 45);
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
