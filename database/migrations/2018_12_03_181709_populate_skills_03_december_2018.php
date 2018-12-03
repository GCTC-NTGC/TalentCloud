<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateSkills03December2018 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('skills')->insert([
            ['id' => 66, 'name' => 'scrum', 'skill_type_id'=>2],
            ['id' => 67, 'name' => 'team_foundation_server', 'skill_type_id'=>2],
            ['id' => 68, 'name' => 'n_unit_testing', 'skill_type_id'=>2],
            ['id' => 69, 'name' => 'asp_net_mvc', 'skill_type_id'=>2],
            ['id' => 70, 'name' => 'ef6', 'skill_type_id'=>2],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('skills')->whereIn('id', [66, 67, 68, 69, 70])->delete();
    }
}
