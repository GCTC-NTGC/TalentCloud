<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MakeCourseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->string('institution')->nullable();
            $table->integer('course_status_id')->unsigned()->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->integer('applicant_id')->unsigned();
            $table->timestamps();
        });

        Schema::create('course_status', function (Blueprint $table) {
           $table->increments('id');
           $table->string('name');
           $table->timestamps();
        });

        Schema::table('courses', function (Blueprint $table) {
            $table->foreign('course_status_id')->references('id')->
                on('course_status')->onUpdate('CASCADE')->onDelete('NO ACTION');
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
        Schema::dropIfExists('courses');
        Schema::dropIfExists('course_status');
    }
}
