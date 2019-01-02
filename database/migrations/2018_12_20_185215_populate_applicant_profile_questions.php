<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateApplicantProfileQuestions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('applicant_profile_questions')->insert([
            ['id' => 1, 'name' => 'career_journey'],
            ['id' => 2, 'name' => 'learning_journey'],
            ['id' => 3, 'name' => 'bring_to_team'],
            ['id' => 4, 'name' => 'work_best_when'],
            ['id' => 5, 'name' => 'learn_best_when'],
            ['id' => 6, 'name' => 'types_of_teams'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('applicant_profile_questions')->whereIn('id', [1, 2, 3, 4, 5, 6])->delete();
    }
}
