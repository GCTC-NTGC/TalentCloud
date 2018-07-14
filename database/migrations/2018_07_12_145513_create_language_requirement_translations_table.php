<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateLanguageRequirementTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('language_requirement_translations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('locale');
			$table->integer('language_requirement_id')->unsigned()->index();
			$table->string('value');
			$table->timestamps();

			$table->unique(['language_requirement_id','locale'], 'lang_requirement_trans_lang_requirement_id_locale_unique');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('language_requirement_translations');
	}

}
