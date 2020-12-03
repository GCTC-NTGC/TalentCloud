<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddApplicantClassificationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('applicant_classification', function (Blueprint $table) {
            $table->integer('applicant_id');
            $table->integer('classification_id');
            $table->integer('level');
            $table->integer('order');
        });

        Schema::table('applicant_classification', function (Blueprint $table) {
            $table->foreign('applicant_id')
                ->references('id')
                ->on('applicants')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('classification_id')
                ->references('id')
                ->on('classifications')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('applicant_classification');
    }
}
