<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateSkills29November2018 extends Migration
{
    public function up()
    {
        DB::table('skills')->insert([
            ['id' => 65, 'name' => 'database_design_and_management', 'skill_type_id'=>2],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('skills')->whereIn('id', [65])->delete();
    }
}
