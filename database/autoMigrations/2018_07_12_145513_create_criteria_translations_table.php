<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCriteriaTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('criteria_translations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('criteria_id')->unsigned()->index();
			$table->text('name', 65535);
			$table->text('description', 65535)->nullable();
			$table->string('locale', 50);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('criteria_translations');
	}

}
