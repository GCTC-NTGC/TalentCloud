<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPolymorphicRelationshipToWorkExperiences extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('work_experiences', function (Blueprint $table) {
            $table->dropForeign(['applicant_id']);

            $table->renameColumn('applicant_id', 'experienceable_id');
            $table->string('experienceable_type')->default('applicant'); // Set default for existing rows.
        });

        Schema::table('work_experiences', function (Blueprint $table) {
            // Remove default for future rows
            $table->string('experienceable_type')->default(null)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('work_experiences', function (Blueprint $table) {
            $table->renameColumn('experienceable_id', 'applicant_id');
            $table->dropColumn('experienceable_type');

            $table->foreign('applicant_id')->references('id')->on('applicants')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }
}
