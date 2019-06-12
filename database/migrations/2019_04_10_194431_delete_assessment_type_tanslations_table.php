<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DeleteAssessmentTypeTanslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('assessment_type_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('assessment_type_translations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('assessment_type_id')->unsigned();
            $table->string('locale');
            $table->text('name');
            $table->timestamps();

            $table->unique(['assessment_type_id', 'locale']);
            $table->foreign('assessment_type_id')->references('id')->on('assessment_types')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }
}
