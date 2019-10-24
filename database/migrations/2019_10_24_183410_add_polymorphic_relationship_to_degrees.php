<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPolymorphicRelationshipToDegrees extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('degrees', function (Blueprint $table) {
            $table->dropForeign(['applicant_id']);

            $table->renameColumn('applicant_id', 'degreeable_id');
            $table->string('degreeable_type')->default('applicant');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('degrees', function (Blueprint $table) {
            $table->renameColumn('degreeable_id', 'applicant_id');
            $table->dropColumn('degreeable_type');

            $table->foreign('applicant_id')->references('id')->on('applicants')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }
}
