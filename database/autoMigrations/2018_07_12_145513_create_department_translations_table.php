<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDepartmentTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('department_translations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('department_id')->unsigned()->index();
			$table->string('locale', 50);
			$table->string('value', 65);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('department_translations');
	}

}
