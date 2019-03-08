<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddLanguageRequirementConfirmedToJobApplicationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('job_applications', function (Blueprint $table) {
            $table->boolean('language_requirement_confirmed')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('job_applications', function (Blueprint $table) {
            $table->dropColumn('language_requirement_confirmed');
        });
    }
}
