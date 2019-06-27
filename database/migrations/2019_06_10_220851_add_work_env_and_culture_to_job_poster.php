<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddWorkEnvAndCultureToJobPoster extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('job_posters', function (Blueprint $table) {
            $table->integer('team_size')->nullable();

            // Work Env checkboxes
            // Storing as a json because these features are likely to change frequently
            // This way the frontend can store and check whatever tags it wants to.
            $table->json('work_env_features')->nullable();
            $table->integer('fast_vs_steady')->nullable();
            $table->integer('horizontal_vs_vertical')->nullable();
            $table->integer('experimental_vs_ongoing')->nullable();
            $table->integer('citizen_facing_vs_back_office')->nullable();
            $table->integer('collaborative_vs_independent')->nullable();

            $table->integer('telework_allowed_frequency_id')->unsigned()->nullable();
            $table->integer('flexible_hours_frequency_id')->unsigned()->nullable();
            // Add foreign keys for frequencies
            $table->foreign('telework_allowed_frequency_id')->references('id')->on('frequencies')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign('flexible_hours_frequency_id')->references('id')->on('frequencies')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });

        Schema::table('job_poster_translations', function (Blueprint $table) {
            $table->text('work_env_description')->nullable();
            $table->text('culture_summary')->nullable();
            $table->text('culture_special')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('job_posters', function (Blueprint $table) {
            $table->dropColumn('team_size');

            $table->dropColumn('work_env_features');
            $table->dropColumn('fast_vs_steady');
            $table->dropColumn('horizontal_vs_vertical');
            $table->dropColumn('experimental_vs_ongoing');
            $table->dropColumn('citizen_facing_vs_back_office');
            $table->dropColumn('collaborative_vs_independent');

            // Drop foreign keys for frequencies before removing the column itself.
            $table->dropForeign('work_environments_telework_allowed_frequency_id_foreign');
            $table->dropForeign('work_environments_flexible_hours_frequency_id_foreign');
            $table->dropColumn('telework_allowed_frequency_id');
            $table->dropColumn('flexible_hours_frequency_id');
        });

         Schema::table('job_poster_translations', function (Blueprint $table) {
            $table->dropColumn('work_env_description');
            $table->dropColumn('culture_summary');
            $table->dropColumn('culture_special');
         });
    }
}
