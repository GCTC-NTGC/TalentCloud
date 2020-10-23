<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTouchedApplicationStepsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('touched_application_steps', function (Blueprint $table) {
            $table->integer('job_application_id');
            $table->integer('step_id');
            $table->boolean('touched')->default(false);
            $table->timestamps();
        });

        Schema::table('touched_application_steps', function (Blueprint $table) {
            $table->foreign('job_application_id')
            ->references('id')
            ->on('job_applications')
            ->onDelete('CASCADE');

        $table->foreign('step_id')
            ->references('id')
            ->on('job_application_steps')
            ->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('touched_application_steps');
    }
}
