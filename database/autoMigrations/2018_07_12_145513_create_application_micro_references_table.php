<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateApplicationMicroReferencesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('application_micro_references', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('job_application_id')->unsigned()->index();
			$table->integer('criteria_id')->unsigned()->index();
			$table->integer('micro_reference_id')->unsigned()->index();
			$table->boolean('is_active')->default(1);
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
		Schema::drop('application_micro_references');
	}

}
