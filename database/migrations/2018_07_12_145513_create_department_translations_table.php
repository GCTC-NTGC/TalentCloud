<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDepartmentTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('department_translations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('department_id')->unsigned()->index();
			$table->string('locale');
			$table->string('value');
			$table->timestamps();
                        
                        $table->unique(['department_id','locale']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('department_translations');
	}

}
