<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddReferencesToJobApplications extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('job_applications', function (Blueprint $table) {
            $table->string('director_name')->nullable();
            $table->string('director_title')->nullable();
            $table->string('director_email')->nullable();
            $table->string('reference_name')->nullable();
            $table->string('reference_title')->nullable();
            $table->string('reference_email')->nullable();
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
            $table->dropColumn('director_name');
            $table->dropColumn('director_title');
            $table->dropColumn('director_email');
            $table->dropColumn('reference_name');
            $table->dropColumn('reference_title');
            $table->dropColumn('reference_email');
        });
    }
}
