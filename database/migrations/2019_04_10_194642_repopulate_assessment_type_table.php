<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RepopulateAssessmentTypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table( 'assessment_types')->truncate();
        DB::table('assessment_types')->insert([
            ['key' => 'narrative_assessment'],
            ['key' => 'application_screening_question'],
            ['key' => 'group_test'],
            ['key' => 'informal_phone_conversation'],
            ['key' => 'interview'],
            ['key' => 'online_exam'],
            ['key' => 'on_site_exam'],
            ['key' => 'take_home_exam'],
            ['key' => 'portfolio_review_with_candidate'],
            ['key' => 'reference_check'],
            ['key' => 'serious_games']
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
