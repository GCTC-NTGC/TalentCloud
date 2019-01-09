<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateAssessmentTypeTranslations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Narrative assessment
         * Take home exam – Scenario
         * Take home exam – Technical
         * Take home exam – Behavioural
         * Portfolio review
         * Portfolio review with candidate
         * Interview question – Technical
         * Interview question – Scenario
         * Interview question – Behaviour
         * Interview – Overall performance
         * Group test
         * Reference check – Traditional
         * Reference check – Micro
         * Certificate or formal credential
        */
        DB::table('assessment_type_translations')->insert([
            ['id' => 1, 'assessment_type_id' => 1, 'locale' => 'en', 'name' => 'Narrative Assessment'],
            ['id' => 2, 'assessment_type_id' => 1, 'locale' => 'fr', 'name' => 'Narrative Assessment'],
            ['id' => 3, 'assessment_type_id' => 2, 'locale' => 'en', 'name' => 'Take home exam – Scenario'],
            ['id' => 4, 'assessment_type_id' => 2, 'locale' => 'fr', 'name' => 'Take home exam – Scenario'],
            ['id' => 5, 'assessment_type_id' => 3, 'locale' => 'en', 'name' => 'Take home exam – Technical'],
            ['id' => 6, 'assessment_type_id' => 3, 'locale' => 'fr', 'name' => 'Take home exam – Technical'],
            ['id' => 7, 'assessment_type_id' => 4, 'locale' => 'en', 'name' => 'Take home exam – Behavioural'],
            ['id' => 8, 'assessment_type_id' => 4, 'locale' => 'fr', 'name' => 'Take home exam – Behavioural'],
            ['id' => 9, 'assessment_type_id' => 5, 'locale' => 'en', 'name' => 'Portfolio review'],
            ['id' => 10, 'assessment_type_id' => 5, 'locale' => 'fr', 'name' => 'Portfolio review'],
            ['id' => 11, 'assessment_type_id' => 6, 'locale' => 'en', 'name' => 'Portfolio review with candidate'],
            ['id' => 12, 'assessment_type_id' => 6, 'locale' => 'fr', 'name' => 'Portfolio review with candidate'],
            ['id' => 13, 'assessment_type_id' => 7, 'locale' => 'en', 'name' => 'Interview question – Technical'],
            ['id' => 14, 'assessment_type_id' => 7, 'locale' => 'fr', 'name' => 'Interview question – Technical'],
            ['id' => 15, 'assessment_type_id' => 8, 'locale' => 'en', 'name' => 'Interview question – Scenario'],
            ['id' => 16, 'assessment_type_id' => 8, 'locale' => 'fr', 'name' => 'Interview question – Scenario'],
            ['id' => 17, 'assessment_type_id' => 9, 'locale' => 'en', 'name' => 'Interview question – Behaviour'],
            ['id' => 18, 'assessment_type_id' => 9, 'locale' => 'fr', 'name' => 'Interview question – Behaviour'],
            ['id' => 19, 'assessment_type_id' => 10, 'locale' => 'en', 'name' => 'Interview – Overall performance'],
            ['id' => 20, 'assessment_type_id' => 10, 'locale' => 'fr', 'name' => 'Interview – Overall performance'],
            ['id' => 21, 'assessment_type_id' => 11, 'locale' => 'en', 'name' => 'Group test'],
            ['id' => 22, 'assessment_type_id' => 11, 'locale' => 'fr', 'name' => 'Group test'],
            ['id' => 23, 'assessment_type_id' => 12, 'locale' => 'en', 'name' => 'Reference check – Traditional'],
            ['id' => 24, 'assessment_type_id' => 12, 'locale' => 'fr', 'name' => 'Reference check – Traditional'],
            ['id' => 25, 'assessment_type_id' => 13, 'locale' => 'en', 'name' => 'Reference check – Micro'],
            ['id' => 26, 'assessment_type_id' => 13, 'locale' => 'fr', 'name' => 'Reference check – Micro'],
            ['id' => 27, 'assessment_type_id' => 14, 'locale' => 'en', 'name' => 'Certificate or formal credentia'],
            ['id' => 28, 'assessment_type_id' => 14, 'locale' => 'fr', 'name' => 'Certificate or formal credentia'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('assessment_type_translations')->whereIn('id', [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28
        ])->delete();
    }
}
