<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MakeDegreeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('degrees', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('degree_type_id')->unsigned()->nullable();
            $table->string('area_of_study')->nullable();
            $table->string('institution')->nullable();
            $table->string('thesis')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->integer('applicant_id')->unsigned();
            $table->timestamps();
        });

         Schema::create('degree_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::table('degrees', function (Blueprint $table) {
            $table->foreign('degree_type_id')->references('id')->
                on('degree_types')->onUpdate('CASCADE')->onDelete('NO ACTION');
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
        Schema::dropIfExists('degrees');
        Schema::dropIfExists('degree_types');
    }
}
