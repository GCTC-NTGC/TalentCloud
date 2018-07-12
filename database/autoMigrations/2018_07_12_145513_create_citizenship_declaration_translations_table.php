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
			$table->string('locale');
			$table->text('value');
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
		Schema::drop('citizenship_declaration_translations');
	}

}
