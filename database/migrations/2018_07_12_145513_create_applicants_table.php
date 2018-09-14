<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateApplicantsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('applicants', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('personal_website')->nullable();
			$table->text('tagline')->nullable();
			$table->string('twitter_username')->nullable();
			$table->string('linkedin_username')->nullable();
			$table->integer('user_id')->unsigned()->unique()->index();
			$table->boolean('is_snapshot')->default(false);
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
		Schema::drop('applicants');
	}

}
