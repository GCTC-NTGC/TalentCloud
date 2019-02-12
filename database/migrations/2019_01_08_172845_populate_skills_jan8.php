<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateSkillsJan8 extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('skills')->insert([
            ['skill_type_id' => 2, 'name' => 'requirements_analysis'],
            ['skill_type_id' => 2, 'name' => 'quality_assurance'],
            ['skill_type_id' => 2, 'name' => 'accessibility_assessment_apps'],
            ['skill_type_id' => 2, 'name' => 'community_engagement'],
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
            'requirements_analysis',
            'quality_assurance',
            'accessibility_assessment_apps',
            'community_engagement'
        ])->delete();
    }
}
