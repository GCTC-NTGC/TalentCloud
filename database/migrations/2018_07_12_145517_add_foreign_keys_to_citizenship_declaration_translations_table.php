<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToCitizenshipDeclarationTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('citizenship_declaration_translations', function(Blueprint $table)
		{
			//Custom foreign key name because default exceeds length limit  
			$table->foreign('citizenship_declaration_id', 'citizenship_declaration_trans_citizenship_declaration_fk')->references('id')->on('citizenship_declarations')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('citizenship_declaration_translations', function(Blueprint $table)
		{
			//Custom foreign key name because default exceeds length limit  
			$table->dropForeign('citizenship_declaration_trans_citizenship_declaration_fk');
		});
	}

}
