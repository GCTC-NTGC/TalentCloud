<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateSkills extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('skills')->insert([
            ['id' => 1, 'skill_type_id' => 2, 'name' => 'front_end_dev'],
            ['id' => 2, 'skill_type_id' => 2, 'name' => 'web_programming'],
            ['id' => 3, 'skill_type_id' => 2, 'name' => 'server_admin'],
            ['id' => 4, 'skill_type_id' => 2, 'name' => 'linux'],
            ['id' => 5, 'skill_type_id' => 2, 'name' => 'css'],
            ['id' => 6, 'skill_type_id' => 2, 'name' => 'javascript'],
            ['id' => 7, 'skill_type_id' => 2, 'name' => 'c_plus_plus'],
            ['id' => 8, 'skill_type_id' => 2, 'name' => 'sass'],
            ['id' => 9, 'skill_type_id' => 2, 'name' => 'python'],
            ['id' => 10, 'skill_type_id' => 2, 'name' => 'php'],
            ['id' => 11, 'skill_type_id' => 2, 'name' => 'git'],
            ['id' => 12, 'skill_type_id' => 2, 'name' => 'docker'],
            ['id' => 13, 'skill_type_id' => 2, 'name' => 'html'],
            ['id' => 14, 'skill_type_id' => 2, 'name' => 'sql'],
            ['id' => 15, 'skill_type_id' => 2, 'name' => 'open_source'],
            ['id' => 16, 'skill_type_id' => 2, 'name' => 'verbal_communication'],
            ['id' => 17, 'skill_type_id' => 2, 'name' => 'written_communication'],
            ['id' => 18, 'skill_type_id' => 2, 'name' => 'ability_distributed_team'],
            ['id' => 19, 'skill_type_id' => 1, 'name' => 'ability_learn'],
            ['id' => 20, 'skill_type_id' => 1, 'name' => 'integrity'],
            ['id' => 21, 'skill_type_id' => 1, 'name' => 'ability_collaborate'],
            ['id' => 22, 'skill_type_id' => 1, 'name' => 'initiative'],
            ['id' => 23, 'skill_type_id' => 1, 'name' => 'humility'],
            ['id' => 24, 'skill_type_id' => 1, 'name' => 'passion'],
            ['id' => 25, 'skill_type_id' => 1, 'name' => 'flexibility'],
            ['id' => 26, 'skill_type_id' => 1, 'name' => 'judgement'],
            ['id' => 27, 'skill_type_id' => 1, 'name' => 'adaptability'],
            ['id' => 28, 'skill_type_id' => 1, 'name' => 'accountability'],
            ['id' => 29, 'skill_type_id' => 1, 'name' => 'attention_detail'],
            ['id' => 30, 'skill_type_id' => 1, 'name' => 'complex_problem_solving'],
            ['id' => 31, 'skill_type_id' => 1, 'name' => 'courage'],
            ['id' => 32, 'skill_type_id' => 1, 'name' => 'originality'],
            ['id' => 33, 'skill_type_id' => 1, 'name' => 'critical_thinking'],
            ['id' => 34, 'skill_type_id' => 1, 'name' => 'curiosity'],
            ['id' => 35, 'skill_type_id' => 1, 'name' => 'dependability'],
            ['id' => 36, 'skill_type_id' => 1, 'name' => 'ability_follow_instructions'],
            ['id' => 37, 'skill_type_id' => 1, 'name' => 'persistence'],
            ['id' => 38, 'skill_type_id' => 1, 'name' => 'resilience'],
            ['id' => 39, 'skill_type_id' => 1, 'name' => 'service_orientation'],
            ['id' => 40, 'skill_type_id' => 1, 'name' => 'social_perceptiveness'],
            ['id' => 41, 'skill_type_id' => 1, 'name' => 'stress_management'],
            ['id' => 42, 'skill_type_id' => 1, 'name' => 'stress_tolerance'],
            ['id' => 43, 'skill_type_id' => 1, 'name' => 'time_management'],
            ['id' => 44, 'skill_type_id' => 1, 'name' => 'willingness_learn'],
            ['id' => 45, 'skill_type_id' => 2, 'name' => 'management_ability'],
            ['id' => 46, 'skill_type_id' => 2, 'name' => 'experience_design'],
            ['id' => 47, 'skill_type_id' => 2, 'name' => 'project_management'],
            ['id' => 48, 'skill_type_id' => 2, 'name' => 'stakeholder_relations'],
            ['id' => 49, 'skill_type_id' => 2, 'name' => 'dot_net'],
            ['id' => 50, 'skill_type_id' => 2, 'name' => 'geospacial_programming'],
            ['id' => 51, 'skill_type_id' => 2, 'name' => 'microsoft_dynamics'],
            ['id' => 52, 'skill_type_id' => 2, 'name' => 'facilitation'],
            ['id' => 53, 'skill_type_id' => 2, 'name' => 'systems_thinking'],
            ['id' => 54, 'skill_type_id' => 2, 'name' => 'web_architecture'],
            ['id' => 55, 'skill_type_id' => 2, 'name' => 'storytelling'],
            ['id' => 56, 'skill_type_id' => 2, 'name' => 'user_design'],
            ['id' => 57, 'skill_type_id' => 1, 'name' => 'empathy'],
            ['id' => 58, 'skill_type_id' => 2, 'name' => 'analysis'],
            ['id' => 59, 'skill_type_id' => 2, 'name' => 'data_science'],
            ['id' => 60, 'skill_type_id' => 1, 'name' => 'results_oriented'],
            ['id' => 61, 'skill_type_id' => 1, 'name' => 'relationship_management'],
            ['id' => 62, 'skill_type_id' => 2, 'name' => 'data_analysis'],
            ['id' => 63, 'skill_type_id' => 2, 'name' => 'data_mining'],
            ['id' => 64, 'skill_type_id' => 2, 'name' => 'r_programming'],
            ['id' => 65, 'skill_type_id' => 2, 'name' => 'database_design_and_management'],
            ['id' => 66, 'skill_type_id' => 2, 'name' => 'scrum'],
            ['id' => 67, 'skill_type_id' => 2, 'name' => 'team_foundation_server'],
            ['id' => 68, 'skill_type_id' => 2, 'name' => 'n_unit_testing'],
            ['id' => 69, 'skill_type_id' => 2, 'name' => 'asp_net_mvc'],
            ['id' => 70, 'skill_type_id' => 2, 'name' => 'ef6'],
            ['id' => 71, 'skill_type_id' => 2, 'name' => 'cloud_architecture_for_mobile_and_applications'],
            ['id' => 72, 'skill_type_id' => 2, 'name' => 'cloud_computing_platform_configuration'],
            ['id' => 73, 'skill_type_id' => 2, 'name' => 'strategy_development'],
        ]);
    }
    
    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('province_translations')->whereIn('id',
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
        51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
        61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
        71, 72, 73])->delete();
    }
}
