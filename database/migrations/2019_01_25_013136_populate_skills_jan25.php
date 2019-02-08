<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateSkillsJan25 extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('skills')->insert([
            ['id' => 81, 'skill_type_id' => 2, 'name' => 'business_process_modelling_software'],
            ['id' => 82, 'skill_type_id' => 2, 'name' => 'business_process_modelling'],
            ['id' => 83, 'skill_type_id' => 2, 'name' => 'business_analysis'],
            ['id' => 84, 'skill_type_id' => 2, 'name' => 'project_management_practices'],
            ['id' => 85, 'skill_type_id' => 2, 'name' => 'goc_policy_project_management'],
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('skills')->whereIn('id', [81, 82, 83, 84, 85])->delete();
    }
}
