<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTeamCultureTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('team_culture_translations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('team_culture_id')->unsigned()->index();
			$table->string('locale');
			$table->text('narrative_text')->nullable();
			$table->text('operating_context')->nullable();
			$table->text('what_we_value')->nullable();
			$table->text('how_we_work')->nullable();
			$table->timestamps();

			$table->unique(['team_culture_id','locale']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('team_culture_translations');
	}

}
