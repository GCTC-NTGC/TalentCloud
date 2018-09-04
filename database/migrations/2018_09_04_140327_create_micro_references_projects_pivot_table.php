<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMicroReferencesProjectsPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('micro_reference_project', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('micro_reference_id')->unsigned();
            $table->integer('project_id')->unsigned();
            $table->timestamps();
        });

        Schema::table('micro_reference_project', function (Blueprint $table) {
            $table->foreign('micro_reference_id')->references('id')->on('micro_references')->onUpdate('CASCADE')->onDelete('CASCADE');
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
        Schema::dropIfExists('micro_reference_project');
    }
}
