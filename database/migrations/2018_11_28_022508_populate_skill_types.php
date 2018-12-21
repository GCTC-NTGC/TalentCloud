<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateLookups extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Populate SkillTypes
        DB::table('skill_types')->insert([
            ['id' => 1, 'name' => 'soft'],
            ['id' => 2, 'name' => 'hard'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('skill_types')->whereIn('id', [1, 2])->delete();
    }
}
