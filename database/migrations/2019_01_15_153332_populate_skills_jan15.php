<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateSkillsJan15 extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('skills')->insert([
            ['id' => 78, 'skill_type_id' => 2, 'name' => 'solution_architecture_mobile'],
            ['id' => 79, 'skill_type_id' => 2, 'name' => 'mobile_app_design'],
            ['id' => 80, 'skill_type_id' => 2, 'name' => 'mobile_development_cloud'],
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('skills')->whereIn('id', [78, 79, 80])->delete();
    }
}
