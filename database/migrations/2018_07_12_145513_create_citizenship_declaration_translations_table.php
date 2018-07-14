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
			$table->increments('id');
			//Custom index name because exceeds length limit 
			$table->integer('citizenship_declaration_id')->unsigned()->index("citizenship_declaration_trans_citizenship_declaration_id_idx"); 
			$table->string('locale');
			$table->text('value');
			$table->timestamps();
                        
            $table->unique(['citizenship_declaration_id','locale'],'citiz_declaration_trans_citiz_declaration_id_locale_unique');
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
