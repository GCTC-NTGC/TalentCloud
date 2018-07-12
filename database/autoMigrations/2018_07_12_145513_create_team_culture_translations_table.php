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
			$table->string('locale', 50);
			$table->text('narrative_text', 65535);
			$table->text('operating_context', 65535);
			$table->text('what_we_value', 65535);
			$table->text('how_we_work', 65535);
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
