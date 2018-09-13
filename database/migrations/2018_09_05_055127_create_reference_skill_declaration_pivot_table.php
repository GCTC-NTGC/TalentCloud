<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReferenceSkillDeclarationPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reference_skill_declaration', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('reference_id')->unsigned();
            $table->integer('skill_declaration_id')->unsigned();
            $table->timestamps();
        });

        Schema::table('reference_skill_declaration', function (Blueprint $table) {
            $table->foreign('reference_id')->references('id')->on('references')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('skill_declaration_id')->references('id')->on('skill_declarations')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reference_skill_declaration');
    }
}
