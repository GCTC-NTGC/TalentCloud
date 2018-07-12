<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMicroReferencesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('micro_references', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name', 45)->nullable();
			$table->string('email', 45)->nullable();
			$table->integer('relationship_id')->unsigned()->nullable()->index();
			$table->date('observed_from_date')->nullable();
			$table->date('observed_until_date')->nullable();
			$table->integer('experience_level_id')->unsigned()->nullable()->index();
			$table->text('story', 65535)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('micro_references');
	}

}
