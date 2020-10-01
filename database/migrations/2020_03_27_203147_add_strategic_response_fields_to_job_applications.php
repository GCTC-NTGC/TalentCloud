<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddStrategicResponseFieldsToJobApplications extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('job_applications', function (Blueprint $table) {
            $table->string('gov_email')->nullable();
            $table->boolean('physical_office_willing')->default(false);
            $table->integer('security_clearance_id')->nullable();

            $table->foreign('security_clearance_id')
                ->references('id')
                ->on('security_clearances')
                ->onUpdate('CASCADE')
                ->onDelete('NO ACTION');
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
            $table->dropColumn('gov_email');
            $table->dropColumn('physical_office_willing');
            $table->dropColumn('security_clearance_id');
        });
    }
}
