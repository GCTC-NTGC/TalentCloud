<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MakeWorkExperienceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('work_experiences', function (Blueprint $table) {
            $table->increments('id');
            $table->string('role')->nullable();
            $table->string('company')->nullable();
            $table->text('description')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->integer('applicant_id')->unsigned();
            $table->timestamps();
        });

        Schema::table('work_experiences', function (Blueprint $table) {
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
        Schema::dropIfExists('work_experiences');
    }
}
