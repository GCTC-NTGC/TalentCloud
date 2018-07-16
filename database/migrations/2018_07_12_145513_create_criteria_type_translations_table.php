<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCriteriaTypeTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('criteria_type_translations', function(Blueprint $table)
		{
			$table->increments('id');
                        $table->integer('criteria_type_id')->unsigned()->index();
                        $table->string('locale');
			$table->string('value');
			$table->text('description');
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
		Schema::drop('criteria_type_translations');
	}

}
