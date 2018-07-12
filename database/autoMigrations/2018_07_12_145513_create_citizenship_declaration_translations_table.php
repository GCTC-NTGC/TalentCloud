<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCitizenshipDeclarationTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('citizenship_declaration_translations', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('citizenship_declaration_id')->unsigned()->index();
			$table->string('locale', 50);
			$table->text('value', 65535);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('citizenship_declaration_translations');
	}

}
