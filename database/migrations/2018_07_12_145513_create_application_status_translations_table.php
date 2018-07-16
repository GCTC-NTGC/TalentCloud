<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateApplicationStatusTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('application_status_translations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('application_status_id')->unsigned()->index();
			$table->string('locale');
			$table->string('value')->nullable();
			$table->timestamps();
                        
            $table->unique(['application_status_id','locale'], 'application_status_trans_application_status_id_locale_unique');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('application_status_translations');
	}

}
