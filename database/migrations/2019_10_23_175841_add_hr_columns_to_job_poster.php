<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddHrColumnsToJobPoster extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('job_posters', function (Blueprint $table) {
            $table->integer('process_number')->nullable();
            $table->integer('priority_clearance_number')->nullable();
            $table->date('loo_issuance_date')->nullable();
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
            $table->dropColumn('process_number');
            $table->dropColumn('priority_clearance_number');
            $table->dropColumn('loo_issuance_date');
        });
    }
}
