<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTranslationsToAssessmentTypesAsJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('assessment_types', function (Blueprint $table) {
            $table->json('value')->nullable();
        });

        $narrative_assessment = [
            'en' => 'Narrative Assessment',
            'fr' => 'Examen narratif'
        ];
        DB::table('assessment_types')->where('id', 1)->update([
            'value' => json_encode($narrative_assessment)
        ]);
        $application_screening_question = [
            'en' => 'Application Screening Question',
            'fr' => 'Questions de présélection dans le cadre du processus d\'embauche'
        ];
        DB::table('assessment_types')->where('id', 2)->update([
            'value' => json_encode($application_screening_question)
        ]);
        $group_test = [
            'en' => 'Group Test',
            'fr' => 'Test de groupe'
        ];
        DB::table('assessment_types')->where('id', 3)->update([
            'value' => json_encode($group_test)
        ]);
        $informal_phone_conversation = [
            'en' => 'Informal Phone Conversation',
            'fr' => 'Conversation téléphonique informelle'
        ];
        DB::table('assessment_types')->where('id', 4)->update([
            'value' => json_encode($informal_phone_conversation)
        ]);
        $interview = [
            'en' => 'Interview',
            'fr' => 'Entrevue'
        ];
        DB::table('assessment_types')->where('id', 5)->update([
            'value' => json_encode($interview)
        ]);
        $online_exam = [
            'en' => 'Online Exam',
            'fr' => 'Épreuve en ligne'
        ];
        DB::table('assessment_types')->where('id', 6)->update([
            'value' => json_encode($online_exam)
        ]);
        $on_site_exam = [
            'en' => 'On Site Exam',
            'fr' => 'Épreuve sur place'
        ];
        DB::table('assessment_types')->where('id', 7)->update([
            'value' => json_encode($on_site_exam)
        ]);
        $take_home_exam = [
            'en' => 'Take Home Exam',
            'fr' => 'Épreuve à la maison'
        ];
        DB::table('assessment_types')->where('id', 8)->update([
            'value' => json_encode($take_home_exam)
        ]);
        $portfolio_review_with_candidate = [
            'en' => 'Portfolio Review',
            'fr' => 'Examen du portfeuille'
        ];
        DB::table('assessment_types')->where('id', 9)->update([
            'value' => json_encode($portfolio_review_with_candidate)
        ]);
        $reference_check = [
            'en' => 'Reference Check',
            'fr' => 'Vérification des références'
        ];
        DB::table('assessment_types')->where('id', 10)->update([
            'value' => json_encode($reference_check)
        ]);
        $serious_games = [
            'en' => 'Serious Games',
            'fr' => 'Jeux sérieux'
        ];
        DB::table('assessment_types')->where('id', 11)->update([
            'value' => json_encode($serious_games)
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('assessment_types', function (Blueprint $table) {
            $table->dropColumn('value');
        });
    }
}
