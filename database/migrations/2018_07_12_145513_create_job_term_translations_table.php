<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateJobTermTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('job_term_translations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('job_term_id')->unsigned()->index();
			$table->string('value')->nullable();
			$table->string('locale');
			$table->timestamps();

			$table->unique(['job_term_id','locale']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('job_term_translations');
	}

}
