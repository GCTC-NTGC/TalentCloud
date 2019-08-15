<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOvertimeRequirementsIdToJobPosters extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('job_posters', function (Blueprint $table) {
            $table->unsignedBigInteger('overtime_requirement_id')
                ->nullable();
            $table->foreign('overtime_requirement_id')
                ->references('id')->on('overtime_requirements');
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
            $table->dropForeign(['overtime_requirement_id']);
            $table->dropColumn('overtime_requirement_id');
        });
    }
}
