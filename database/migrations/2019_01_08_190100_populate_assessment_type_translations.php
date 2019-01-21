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
            ['id' => 2, 'assessment_type_id' => 1, 'locale' => 'fr', 'name' => 'Évaluation narrative'],
            ['id' => 3, 'assessment_type_id' => 2, 'locale' => 'en', 'name' => 'Take home exam – Scenario-based (behaviour)'],
            ['id' => 4, 'assessment_type_id' => 2, 'locale' => 'fr', 'name' => 'Examen à la maison - basé sur un scénario (comportement)'],
            ['id' => 5, 'assessment_type_id' => 3, 'locale' => 'en', 'name' => 'Take home exam – Problem-based (analysis)'],
            ['id' => 6, 'assessment_type_id' => 3, 'locale' => 'fr', 'name' => 'Examen à la maison - basé sur le problème (analyse)'],
            ['id' => 7, 'assessment_type_id' => 4, 'locale' => 'en', 'name' => 'Take home exam – Technical skills'],
            ['id' => 8, 'assessment_type_id' => 4, 'locale' => 'fr', 'name' => 'Examen à la maison - Compétences techniques'],
            ['id' => 9, 'assessment_type_id' => 5, 'locale' => 'en', 'name' => 'Take home exam – Research'],
            ['id' => 10, 'assessment_type_id' => 5, 'locale' => 'fr', 'name' => 'Examen à la maison - Recherche'],
            ['id' => 11, 'assessment_type_id' => 6, 'locale' => 'en', 'name' => 'Take home exam – self-assessment'],
            ['id' => 12, 'assessment_type_id' => 6, 'locale' => 'fr', 'name' => 'Examen à domicile - auto-évaluation'],
            ['id' => 13, 'assessment_type_id' => 7, 'locale' => 'en', 'name' => 'On site exam – Technical skills'],
            ['id' => 14, 'assessment_type_id' => 7, 'locale' => 'fr', 'name' => 'Examen sur site - Compétences techniques'],
            ['id' => 15, 'assessment_type_id' => 8, 'locale' => 'en', 'name' => 'On site exam – Self-assessment'],
            ['id' => 16, 'assessment_type_id' => 8, 'locale' => 'fr', 'name' => 'Examen sur site - Auto-évaluation'],
            ['id' => 17, 'assessment_type_id' => 9, 'locale' => 'en', 'name' => 'Online exam – Technical skills'],
            ['id' => 18, 'assessment_type_id' => 9, 'locale' => 'fr', 'name' => 'Examen en ligne - Compétences techniques'],
            ['id' => 19, 'assessment_type_id' => 10, 'locale' => 'en', 'name' => 'Online exam – Psychometric (PSC)'],
            ['id' => 20, 'assessment_type_id' => 10, 'locale' => 'fr', 'name' => 'Examen en ligne - Psychométrique (PSC)'],
            ['id' => 21, 'assessment_type_id' => 11, 'locale' => 'en', 'name' => 'Online exam – Cognitive abilities test (PSC)'],
            ['id' => 22, 'assessment_type_id' => 11, 'locale' => 'fr', 'name' => 'Examen en ligne - Test d\' aptitudes cognitives(PSC)'],
            ['id' => 23, 'assessment_type_id' => 12, 'locale' => 'en', 'name' => 'Interview question – Technical skills'],
            ['id' => 24, 'assessment_type_id' => 12, 'locale' => 'fr', 'name' => 'Question d\' entretien - Compétences techniques '],
            ['id' => 25, 'assessment_type_id' => 13, 'locale' => 'en', 'name' => 'Interview question – Scenario-based (behaviour)'],
            ['id' => 26, 'assessment_type_id' => 13, 'locale' => 'fr', 'name' => 'Question d\' entretien - Basé sur un scénario(comportement)'],
            ['id' => 27, 'assessment_type_id' => 14, 'locale' => 'en', 'name' => 'Interview question – Problem-based (analysis)'],
            ['id' => 28, 'assessment_type_id' => 14, 'locale' => 'fr', 'name' => 'Question d\' entretien - Fondée sur le problème(analyse)'],
            ['id' => 29, 'assessment_type_id' => 15, 'locale' => 'en', 'name' => 'Interview question – Past experience'],
            ['id' => 30, 'assessment_type_id' => 15, 'locale' => 'fr', 'name' => 'Question d\' entrevue - Expérience antérieure'],
            ['id' => 31, 'assessment_type_id' => 16, 'locale' => 'en', 'name' => 'Interview question – Self-assessment'],
            ['id' => 32, 'assessment_type_id' => 16, 'locale' => 'fr', 'name' => 'Question d\' entrevue - Auto - évaluation'],
            ['id' => 33, 'assessment_type_id' => 17, 'locale' => 'en', 'name' => 'Interview – Overall performance'],
            ['id' => 34, 'assessment_type_id' => 17, 'locale' => 'fr', 'name' => 'Entretien - Performance globale'],
            ['id' => 35, 'assessment_type_id' => 18, 'locale' => 'en', 'name' => 'Informal phone conversation'],
            ['id' => 36, 'assessment_type_id' => 18, 'locale' => 'fr', 'name' => 'Conversation téléphonique informelle'],
            ['id' => 37, 'assessment_type_id' => 19, 'locale' => 'en', 'name' => 'Portfolio review (online submission)'],
            ['id' => 38, 'assessment_type_id' => 19, 'locale' => 'fr', 'name' => 'Examen du portefeuille (soumission en ligne)'],
            ['id' => 39, 'assessment_type_id' => 20, 'locale' => 'en', 'name' => 'Portfolio review with candidate'],
            ['id' => 40, 'assessment_type_id' => 20, 'locale' => 'fr', 'name' => 'Examen du portefeuille avec le candidat'],
            ['id' => 41, 'assessment_type_id' => 21, 'locale' => 'en', 'name' => 'Group test – Problem-based (analysis)'],
            ['id' => 42, 'assessment_type_id' => 21, 'locale' => 'fr', 'name' => 'Test de groupe - Fondé sur un problème (analyse)'],
            ['id' => 43, 'assessment_type_id' => 22, 'locale' => 'en', 'name' => 'Group test – Behavioural interaction'],
            ['id' => 44, 'assessment_type_id' => 22, 'locale' => 'fr', 'name' => 'Test de groupe - Interaction comportementale'],
            ['id' => 45, 'assessment_type_id' => 23, 'locale' => 'en', 'name' => 'Serious games – Behavioural interaction'],
            ['id' => 46, 'assessment_type_id' => 23, 'locale' => 'fr', 'name' => 'Jeux sérieux - Interaction comportementale'],
            ['id' => 47, 'assessment_type_id' => 24, 'locale' => 'en', 'name' => 'Serious games – Ability to learn'],
            ['id' => 48, 'assessment_type_id' => 24, 'locale' => 'fr', 'name' => 'Jeux sérieux - Capacité d\'apprendre'],
            ['id' => 49, 'assessment_type_id' => 25, 'locale' => 'en', 'name' => 'Serious games – Analytical'],
            ['id' => 50, 'assessment_type_id' => 25, 'locale' => 'fr', 'name' => 'Jeux sérieux - Analytical'],
            ['id' => 51, 'assessment_type_id' => 26, 'locale' => 'en', 'name' => 'Reference check – Micro-reference'],
            ['id' => 52, 'assessment_type_id' => 26, 'locale' => 'fr', 'name' => 'Vérification de référence - Micro-référence'],
            ['id' => 53, 'assessment_type_id' => 27, 'locale' => 'en', 'name' => 'Reference check – Conversation with reference'],
            ['id' => 54, 'assessment_type_id' => 27, 'locale' => 'fr', 'name' => 'Vérification de référence - Conversation avec référence']
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
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            51, 52, 53, 54,
        ])->delete();
    }
}
