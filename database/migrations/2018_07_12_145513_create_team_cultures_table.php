<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTeamCulturesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('team_cultures', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('team_size')->nullable();
			$table->string('gc_directory_url')->nullable();
			$table->integer('manager_id')->unsigned()->unique()->index();
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
		Schema::drop('team_cultures');
	}

}
