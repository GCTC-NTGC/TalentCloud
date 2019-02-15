<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSkillsForeignKeyToSkillDeclarations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('skill_declarations', function (Blueprint $table) {
            $table->foreign('skill_id')->references('id')->
                on('skills')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('skill_declarations', function (Blueprint $table) {
            $table->dropForeign(['skill_id']);
        });
    }
}
