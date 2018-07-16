<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToMicroReferencesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('micro_references', function(Blueprint $table)
		{
			$table->foreign('experience_level_id')->references('id')->on('experience_levels')->onUpdate('CASCADE')->onDelete('NO ACTION');
			$table->foreign('relationship_id')->references('id')->on('relationships')->onUpdate('CASCADE')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('micro_references', function(Blueprint $table)
		{
			$table->dropForeign('micro_references_experience_level_id_foreign');
			$table->dropForeign('micro_references_relationship_id_foreign');
		});
	}

}
