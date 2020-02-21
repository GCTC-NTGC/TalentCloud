<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPolymorphicRelationshipToSkillDeclarations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('skill_declarations', function (Blueprint $table) {
            $table->dropForeign(['applicant_id']);

            $table->renameColumn('applicant_id', 'skillable_id');
            $table->string('skillable_type')->default('applicant'); // Set default for existing rows.
        });

        Schema::table('skill_declarations', function (Blueprint $table) {
            // Remove default for future rows
            $table->string('skillable_type')->default(null)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('skill_declarations', function (Blueprint $table) {
            $table->renameColumn('skillable_id', 'applicant_id');
            $table->dropColumn('skillable_type');

            $table->foreign('applicant_id')->references('id')->on('applicants')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }
}
