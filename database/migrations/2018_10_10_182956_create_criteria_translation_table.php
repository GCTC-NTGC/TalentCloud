<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCriteriaTranslationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('criteria_translations', function (Blueprint $table) {
            $table->increments('id');
            $table->string('locale');
            $table->integer('criteria_id')->unsigned();
            $table->text('description')->nullable();
            $table->timestamps();

            $table->unique(['criteria_id','locale']);
        });

        Schema::table('criteria_translations', function (Blueprint $table) {
            $table->foreign('criteria_id')->references('id')->on('criteria')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('criteria_translations');
    }
}
