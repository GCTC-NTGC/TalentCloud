<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectReferencePivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_reference', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('reference_id')->unsigned();
            $table->integer('project_id')->unsigned();
            $table->timestamps();
        });

        Schema::table('project_reference', function (Blueprint $table) {
            $table->foreign('reference_id')->references('id')->on('references')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('project_id')->references('id')->on('projects')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_reference');
    }
}
