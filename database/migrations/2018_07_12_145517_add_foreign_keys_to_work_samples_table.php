<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
class AddForeignKeysToWorkSamplesTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('work_samples', function(Blueprint $table)
		{
            $table->foreign('applicant_id')->references('id')->
                on('applicants')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('file_type_id')->references('id')->
                on('file_types')->onUpdate('CASCADE')->onDelete('NO ACTION');
		});
	}
	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('work_samples', function(Blueprint $table)
		{
			$table->dropForeign('work_samples_file_type_id_foreign');
		});
	}
}
