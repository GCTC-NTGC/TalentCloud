<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPolymorphicRelationshipToWorkSamples extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('work_samples', function (Blueprint $table) {
            $table->dropForeign(['applicant_id']);

            $table->renameColumn('applicant_id', 'work_sampleable_id');
            $table->string('work_sampleable_type')->default('applicant'); // Set default for existing rows.
        });

        Schema::table('work_samples', function (Blueprint $table) {
            // Remove default for future rows
            $table->string('work_sampleable_type')->default(null)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('work_samples', function (Blueprint $table) {
            $table->renameColumn('work_sampleable_id', 'applicant_id');
            $table->dropColumn('work_sampleable_type');

            $table->foreign('applicant_id')->references('id')->on('applicants')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }
}
