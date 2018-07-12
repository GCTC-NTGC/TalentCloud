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
			$table->text('tagline', 65535)->nullable();
			$table->string('twitter_username')->nullable();
			$table->string('linkedin_username')->nullable();
			$table->timestamp('last_updated')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->integer('user_id')->unsigned()->index();
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
