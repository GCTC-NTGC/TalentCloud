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
            ['id' => 74, 'skill_type_id' => 2, 'name' => 'requirements_analysis'],
            ['id' => 75, 'skill_type_id' => 2, 'name' => 'quality_assurance'],
            ['id' => 76, 'skill_type_id' => 2, 'name' => 'accessibility_assessment_apps'],
            ['id' => 77, 'skill_type_id' => 2, 'name' => 'community_engagement'],
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('skills')->whereIn('id', [74, 75, 76, 77])->delete();
    }
}
