<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToJobTermTranslationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('job_term_translations', function(Blueprint $table)
		{
			$table->foreign('job_term_id')->references('id')->on('job_terms')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('job_term_translations', function(Blueprint $table)
		{
			$table->dropForeign('job_term_translations_job_term_id_foreign');
		});
	}

}
