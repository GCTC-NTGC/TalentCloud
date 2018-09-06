<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSkillDeclarationsTable extends Migration
{
    /**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('skill_declarations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('skill_id')->unsigned();
			$table->integer('skill_status_id')->unsigned()->nullable();
			$table->integer('skill_level_id')->unsigned()->nullable();
			$table->text('description')->nullable();
            $table->integer('applicant_id')->unsigned();
			$table->timestamps();
		});

        Schema::create('skill_statuses', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name');
			$table->timestamps();
		});

        Schema::table('skill_declarations', function(Blueprint $table)
		{
            $table->foreign('applicant_id')->references('id')->
                on('applicants')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('skill_status_id')->references('id')->
                on('skill_statuses')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign('skill_level_id')->references('id')->
                on('skill_levels')->onUpdate('CASCADE')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('skill_declarations');
        Schema::dropIfExists('skill_statuses');
	}
}
