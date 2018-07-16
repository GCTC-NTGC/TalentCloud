<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateExperienceLevelTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('experience_level_translations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('locale');
			$table->integer('experience_level_id')->unsigned()->index();
			$table->string('value');
			$table->timestamps();
                        
                        $table->unique(['experience_level_id','locale']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('experience_level_translations');
	}

}
