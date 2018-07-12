<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSkillDeclarationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('skill_declaration', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('criteria_id')->unsigned()->index();
			$table->integer('job_application_id')->unsigned()->index();
			$table->integer('experience_level_id')->unsigned()->nullable()->index();
			$table->integer('skill_level_id')->unsigned()->nullable()->index();
			$table->text('description')->nullable();
			$table->boolean('is_active');
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
		Schema::drop('skill_declaration');
	}

}
