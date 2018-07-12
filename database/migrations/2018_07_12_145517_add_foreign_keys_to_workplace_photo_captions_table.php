<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToWorkplacePhotoCaptionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('workplace_photo_captions', function(Blueprint $table)
		{
			$table->foreign('work_environment_id')->references('id')->on('work_environments')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('workplace_photo_id')->references('id')->on('workplace_photos')->onUpdate('CASCADE')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('workplace_photo_captions', function(Blueprint $table)
		{
			$table->dropForeign('workplace_photo_captions_work_environment_id_foreign');
			$table->dropForeign('workplace_photo_captions_workplace_photo_id_foreign');
		});
	}

}
