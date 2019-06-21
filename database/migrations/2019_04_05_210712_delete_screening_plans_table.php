<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DeleteScreeningPlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('screening_plans');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
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
}
