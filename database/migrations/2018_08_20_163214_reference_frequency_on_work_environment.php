<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ReferenceFrequencyOnWorkEnvironment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('work_environments', function (Blueprint $table) {
            $table->dropColumn('remote_allowed');
            $table->dropColumn('telework_allowed');
            $table->dropColumn('flexible_allowed');

            $table->boolean('remote_work_allowed')->nullable();
            $table->integer('telework_allowed_frequency_id')->unsigned()->nullable();
            $table->integer('flexible_hours_frequency_id')->unsigned()->nullable();
        });

        Schema::table('work_environments', function (Blueprint $table) {
            $table->foreign('telework_allowed_frequency_id')->references('id')->on('frequencies')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign('flexible_hours_frequency_id')->references('id')->on('frequencies')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('work_environments', function (Blueprint $table) {
            $table->dropForeign('work_environments_telework_allowed_frequency_id_foreign');
            $table->dropForeign('work_environments_flexible_hours_frequency_id_foreign');
        });

        Schema::table('work_environments', function (Blueprint $table) {
            $table->dropColumn('remote_work_allowed');
            $table->dropColumn('telework_allowed_frequency_id');
            $table->dropColumn('flexible_hours_frequency_id');

            $table->string('remote_allowed')->nullable();
			$table->string('telework_allowed')->nullable();
			$table->string('flexible_allowed')->nullable();
        });
    }
}
