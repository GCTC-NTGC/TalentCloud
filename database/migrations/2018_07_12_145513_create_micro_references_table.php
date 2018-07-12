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
			$table->string('name')->nullable();
			$table->string('email')->nullable();
			$table->integer('relationship_id')->unsigned()->nullable()->index();
			$table->date('observed_from_date')->nullable();
			$table->date('observed_until_date')->nullable();
			$table->integer('experience_level_id')->unsigned()->nullable()->index();
			$table->text('story')->nullable();
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
		Schema::drop('micro_references');
	}

}
