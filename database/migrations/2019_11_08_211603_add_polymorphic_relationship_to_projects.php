<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPolymorphicRelationshipToProjects extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropForeign(['applicant_id']);

            $table->renameColumn('applicant_id', 'projectable_id');
            $table->string('projectable_type')->default('applicant'); // Set default for existing rows.
        });

        Schema::table('projects', function (Blueprint $table) {
            // Remove default for future rows
            $table->string('projectable_type')->default(null)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->renameColumn('projectable_id', 'applicant_id');
            $table->dropColumn('projectable_type');

            $table->foreign('applicant_id')->references('id')->on('applicants')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }
}
