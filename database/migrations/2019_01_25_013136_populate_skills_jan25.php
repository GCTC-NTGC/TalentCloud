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
            ['skill_type_id' => 2, 'name' => 'business_process_modelling_software'],
            ['skill_type_id' => 2, 'name' => 'business_process_modelling'],
            ['skill_type_id' => 2, 'name' => 'business_analysis'],
            ['skill_type_id' => 2, 'name' => 'project_management_practices'],
            ['skill_type_id' => 2, 'name' => 'goc_policy_project_management'],
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('skills')->whereIn('name', [
            'business_process_modelling_software',
            'business_process_modelling',
            'business_analysis',
            'project_management_practices',
            'goc_policy_project_management'
        ])->delete();
    }
}
