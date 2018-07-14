<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRelationshipTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('relationship_translations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('relationship_id')->unsigned()->index();
			$table->string('locale');
			$table->string('value');
			$table->timestamps();

			$table->unique(['relationship_id','locale']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('relationship_translations');
	}

}
