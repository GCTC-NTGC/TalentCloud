<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddThingsToKnowColToWorkEnvironment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('work_environment_translations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('work_environment_id')->unsigned();
            $table->string('locale');
            $table->text('things_to_know')->nullable();
            $table->timestamps();

            $table->unique(['work_environment_id', 'locale']);
        });

        Schema::table('work_environment_translations', function (Blueprint $table) {
            $table->foreign('work_environment_id')->references('id')->
                on('work_environments')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('work_environment_translations');
    }
}
