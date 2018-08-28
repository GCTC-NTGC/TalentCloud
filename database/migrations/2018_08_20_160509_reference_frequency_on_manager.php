<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ReferenceFrequencyOnManager extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('managers', function (Blueprint $table) {
            $table->integer('work_review_frequency_id')->unsigned()->nullable();
            $table->integer('stay_late_frequency_id')->unsigned()->nullable();
            $table->integer('engage_team_frequency_id')->unsigned()->nullable();
            $table->integer('development_opportunity_frequency_id')->unsigned()->nullable();
            $table->integer('refuse_low_value_work_frequency_id')->unsigned()->nullable();
        });

        Schema::table('managers', function (Blueprint $table) {
            $table->foreign('work_review_frequency_id')->references('id')->on('frequencies')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign('stay_late_frequency_id')->references('id')->on('frequencies')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign('engage_team_frequency_id')->references('id')->on('frequencies')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign('development_opportunity_frequency_id')->references('id')->on('frequencies')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign('refuse_low_value_work_frequency_id')->references('id')->on('frequencies')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });

        Schema::table('manager_translations', function (Blueprint $table) {
            $table->dropColumn('review_options');
            $table->dropColumn('staylate');
            $table->dropColumn('engage');
            $table->dropColumn('opportunities');
            $table->dropColumn('low_value_work_requests');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('managers', function (Blueprint $table) {
            $table->dropForeign('managers_work_review_frequency_id_foreign');
            $table->dropForeign('managers_stay_late_frequency_id_foreign');
            $table->dropForeign('managers_engage_team_frequency_id_foreign');
            $table->dropForeign('managers_development_opportunity_frequency_id_foreign');
            $table->dropForeign('managers_refuse_low_value_work_frequency_id_foreign');

            $table->dropColumn('work_review_frequency_id');
            $table->dropColumn('stay_late_frequency_id');
            $table->dropColumn('engage_team_frequency_id');
            $table->dropColumn('development_opportunity_frequency_id');
            $table->dropColumn('refuse_low_value_work_frequency_id');
        });

        Schema::table('manager_translations', function (Blueprint $table) {
            $table->string('review_options')->nullable();
			$table->string('staylate')->nullable();
			$table->string('engage')->nullable();
			$table->string('opportunities')->nullable();
			$table->string('low_value_work_requests')->nullable();
        });
    }
}
