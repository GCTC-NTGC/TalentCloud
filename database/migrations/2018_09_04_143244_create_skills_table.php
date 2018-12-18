<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSkillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('skills', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('skill_type_id')->unsigned();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('skill_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::table('skills', function(Blueprint $table)
		{
            $table->foreign('skill_type_id')->references('id')->
                on('skill_types')->onUpdate('CASCADE')->onDelete('NO ACTION');
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('skills');
        Schema::dropIfExists('skill_types');
    }
}
