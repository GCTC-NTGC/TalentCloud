<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateManagerTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('manager_translations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('locale', 50);
			$table->text('aboutme', 16777215)->nullable();
			$table->text('greatest_accomplishment', 16777215)->nullable();
			$table->text('branch', 65535)->nullable();
			$table->text('division', 65535)->nullable();
			$table->text('position', 65535)->nullable();
			$table->text('leadership_style', 16777215)->nullable();
			$table->text('employee_learning', 16777215)->nullable();
			$table->text('expectations', 16777215)->nullable();
			$table->integer('manager_id')->unsigned()->index();
			$table->string('review_options', 45)->nullable();
			$table->string('staylate', 45)->nullable();
			$table->string('engage', 45)->nullable();
			$table->string('opportunities', 45)->nullable();
			$table->string('low_value_work_requests', 45)->nullable();
			$table->text('work_experience', 16777215)->nullable();
			$table->text('education', 16777215)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('manager_translations');
	}

}
