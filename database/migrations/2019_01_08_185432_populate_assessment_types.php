<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateAssessmentTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('assessment_types')->insert([
            ['id' => 1, 'key' => 'narrative_assessment'],
            ['id' => 2, 'key' => 'take_home_exam_scenario'],
            ['id' => 3, 'key' => 'take_home_exam_technical'],
            ['id' => 4, 'key' => 'take_home_exam_behavioural'],
            ['id' => 5, 'key' => 'portfolio_review'],
            ['id' => 6, 'key' => 'portfolio_review_with_candidate'],
            ['id' => 7, 'key' => 'interview_question_technical'],
            ['id' => 8, 'key' => 'interview_question_scenario'],
            ['id' => 9, 'key' => 'interview_question_behavioural'],
            ['id' => 10, 'key' => 'interview_overall'],
            ['id' => 11, 'key' => 'group_test'],
            ['id' => 12, 'key' => 'reference_check_traditional'],
            ['id' => 13, 'key' => 'reference_check_micro'],
            ['id' => 14, 'key' => 'formal_credential'],
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
                                                      11, 12, 13, 14])->delete();
    }
}
