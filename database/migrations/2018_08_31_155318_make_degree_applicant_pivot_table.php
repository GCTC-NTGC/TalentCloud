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
        Schema::create('degree_applicant_pivot', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('applicant_id')->unsigned();
            $table->integer('degree_id')->unsigned();

            $table->timestamps();
        });

        Schema::table('degree_applicant_pivot', function (Blueprint $table) {
            $table->foreign('degree_id')->references('id')->
                on('degree')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('applicant_id')->references('id')->
                on('applicant')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('degree_applicant_pivot');
    }
}
