<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MakeDegreeApplicantPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('applicant_degree', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('applicant_id')->unsigned();
            $table->integer('degree_id')->unsigned();

            $table->timestamps();
        });

        Schema::table('applicant_degree', function (Blueprint $table) {
            $table->foreign('degree_id')->references('id')->
                on('degrees')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('applicant_id')->references('id')->
                on('applicants')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('applicant_degree');
    }
}
