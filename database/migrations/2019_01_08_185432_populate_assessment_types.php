<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateAssessmentTypes extends Migration
{
    /**
     * Run the migrations.
     *
     *
     *
     * @return void
     */
    public function up()
    {
        DB::table('assessment_types')->insert([
            ['id' => 1, 'key' => 'narrative_assessment'],
            ['id' => 2, 'key' => 'take_home_exam_scenario_behaviour'],
            ['id' => 3, 'key' => 'take_home_exam_problem_analysis'],
            ['id' => 4, 'key' => 'take_home_exam_technical_skills'],
            ['id' => 5, 'key' => 'take_home_exam_research'],
            ['id' => 6, 'key' => 'take_home_exam_self_assessment'],
            ['id' => 7, 'key' => 'on_site_exam_technical_skills'],
            ['id' => 8, 'key' => 'on_site_exam_self_assessment'],
            ['id' => 9, 'key' => 'online_exam_technical_skills'],
            ['id' => 10, 'key' => 'online_exam_psychometric'],
            ['id' => 11, 'key' => 'online_exam_cognitive_abilities'],

            ['id' => 12, 'key' => 'interview_question_technical_skills'],
            ['id' => 13, 'key' => 'interview_question_scenario_behaviour'],
            ['id' => 14, 'key' => 'interview_question_problem_analysis'],
            ['id' => 15, 'key' => 'interview_question_past_experience'],
            ['id' => 16, 'key' => 'interview_question_self_assessment'],
            ['id' => 17, 'key' => 'interview_overall'],
            ['id' => 18, 'key' => 'informal_phone_conversation'],

            ['id' => 19, 'key' => 'portfolio_review_online'],
            ['id' => 20, 'key' => 'portfolio_review_with_candidate'],

            ['id' => 21, 'key' => 'group_test_problem'],
            ['id' => 22, 'key' => 'group_test_behavioural'],

            ['id' => 23, 'key' => 'serious_games_behavioural'],
            ['id' => 24, 'key' => 'serious_games_ability_to_learn'],
            ['id' => 25, 'key' => 'serious_games_analytical'],

            ['id' => 26, 'key' => 'reference_check_conversation'],
            ['id' => 27, 'key' => 'reference_check_micro']
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('assessment_types')->whereIn('id', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                                                      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                                                      21, 22, 23, 24, 25, 26, 27])->delete();
    }
}
