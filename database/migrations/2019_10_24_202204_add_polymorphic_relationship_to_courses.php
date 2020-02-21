<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPolymorphicRelationshipToCourses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropForeign(['applicant_id']);

            $table->renameColumn('applicant_id', 'courseable_id');
            $table->string('courseable_type')->default('applicant'); // Set default for existing rows.
        });

        Schema::table('courses', function (Blueprint $table) {
            // Remove default for future rows
            $table->string('courseable_type')->default(NULL)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->renameColumn('courseable_id', 'applicant_id');
            $table->dropColumn('courseable_type');

            $table->foreign('applicant_id')->references('id')->on('applicants')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }
}
