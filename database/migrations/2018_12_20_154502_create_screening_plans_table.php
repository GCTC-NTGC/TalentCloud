<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScreeningPlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('screening_plans', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('job_poster_id');
            $table->integer('version');
            $table->timestamps();
            $table->unique(['job_poster_id', 'version']);

            $table->foreign('job_poster_id')->references('id')
                ->on('job_posters')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('screening_plans');
    }
}
