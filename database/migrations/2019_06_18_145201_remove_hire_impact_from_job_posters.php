<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveHireImpactFromJobPosters extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('job_poster_translations', function (Blueprint $table) {
            $table->dropColumn('hire_impact');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('job_poster_translations', function (Blueprint $table) {
            $table->text('hire_impact')->nullable();
        });
    }
}
