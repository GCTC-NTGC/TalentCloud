<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTravelRequirementsIdToJobPosters extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('job_posters', function (Blueprint $table) {
            $table->unsignedBigInteger('travel_requirement_id')
                ->nullable();
            $table->foreign('travel_requirement_id')
                ->references('id')->on('travel_requirements');
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
            $table->dropForeign(['travel_requirement_id']);
            $table->dropColumn('travel_requirement_id');
        });
    }
}
