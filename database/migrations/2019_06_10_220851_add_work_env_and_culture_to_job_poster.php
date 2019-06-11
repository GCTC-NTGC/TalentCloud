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
        Schema::table('job_poster', function (Blueprint $table) {
            $table->integer('team_size')->nullable();

            // Work Env checkboxes - liable to change
            $table->boolean('env_open_concept')->default(false);
            $table->boolean('env_private')->default(false);
            $table->boolean('env_windows')->default(false);
            $table->boolean('env_natural_light')->default(false);
            $table->boolean('env_assigned_seating')->default(false);
            $table->boolean('env_smudging')->default(false);
            $table->boolean('tech_video_conferencing')->default(false);
            $table->boolean('tech_task_management')->default(false);
            $table->boolean('tech_collaboration')->default(false);
            $table->boolean('tech_version_control')->default(false);
            $table->boolean('tech_file_sharing')->default(false);
            $table->boolean('tech_unfiltered_wifi')->default(false);
            $table->boolean('amenities_cafeteria')->default(false);
            $table->boolean('amenities_downtown')->default(false);
            $table->boolean('amenities_near_transit')->default(false);
            $table->boolean('amenities_near_fitness')->default(false);
            $table->boolean('amenities_near_restaurants')->default(false);
            $table->boolean('amenities_parking')->default(false);

            // These represent slider values, should be constrained to 1-4
            $table->integer('fast_vs_steady')->nullable();
            $table->integer('horizontal_vs_vertical')->nullable();
            $table->integer('experimental_vs_ongoing')->nullable();
            $table->integer('citizen_facing_vs_back_office')->nullable();
            $table->integer('collaborative_vs_independent')->nullable();

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
        Schema::table('job_poster', function (Blueprint $table) {
            $table->dropColumn('team_size');

            $table->dropColumn('env_open_concept');
            $table->dropColumn('env_private');
            $table->dropColumn('env_windows');
            $table->dropColumn('env_natural_light');
            $table->dropColumn('env_assigned_seating');
            $table->dropColumn('env_smudging');
            $table->dropColumn('tech_video_conferencing');
            $table->dropColumn('tech_task_management');
            $table->dropColumn('tech_collaboration');
            $table->dropColumn('tech_version_control');
            $table->dropColumn('tech_file_sharing');
            $table->dropColumn('tech_unfiltered_wifi');
            $table->dropColumn('amenities_cafeteria');
            $table->dropColumn('amenities_downtown');
            $table->dropColumn('amenities_near_transit');
            $table->dropColumn('amenities_near_fitness');
            $table->dropColumn('amenities_near_restaurants');
            $table->dropColumn('amenities_parking');

            $table->dropColumn('fast_vs_steady');
            $table->dropColumn('horizontal_vs_vertical');
            $table->dropColumn('experimental_vs_ongoing');
            $table->dropColumn('citizen_facing_vs_back_office');
            $table->dropColumn('collaborative_vs_independent');

            $table->dropColumn('culture_summary');
            $table->dropColumn('culture_special');

        });
    }
}
