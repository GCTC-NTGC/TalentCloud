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
			$table->string('locale');
			$table->text('aboutme')->nullable();
			$table->text('greatest_accomplishment')->nullable();
			$table->text('branch')->nullable();
			$table->text('division')->nullable();
			$table->text('position')->nullable();
			$table->text('leadership_style')->nullable();
			$table->text('employee_learning')->nullable();
			$table->text('expectations')->nullable();
			$table->integer('manager_id')->unsigned()->index();
			$table->string('review_options')->nullable();
			$table->string('staylate')->nullable();
			$table->string('engage')->nullable();
			$table->string('opportunities')->nullable();
			$table->string('low_value_work_requests')->nullable();
			$table->text('work_experience')->nullable();
			$table->text('education')->nullable();
			$table->timestamps();

			$table->unique(['manager_id','locale']);
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
