<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTranslationsToCriteriaAsJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('criteria', function (Blueprint $table) {
            $table->json('description')->nullable();
            $table->json('specificity')->nullable();
        });

        $criteria = DB::table('criteria')->get();

        foreach ($criteria as $criterion) {
            $criteriaTranslationsEnglish = DB::table('criteria_translations')->where('criteria_id', $criterion->id)->where('locale', 'en')->first();
            $criteriaTranslationsFrench = DB::table('criteria_translations')->where('criteria_id', $criterion->id)->where('locale', 'fr')->first();

            $criterion->description = collect([$criteriaTranslationsEnglish->locale => $criteriaTranslationsEnglish->value, $criteriaTranslationsFrench->locale => $criteriaTranslationsFrench->value])->toJson();

            $criterion->specificity = collect([$criteriaTranslationsEnglish->locale => $criteriaTranslationsEnglish->impact, $criteriaTranslationsFrench->locale => $criteriaTranslationsFrench->impact])->toJson();

            DB::table('criteria')->where('id', $criterion->id)->update([
                'id' => $criterion->id,
                'description' => $criterion->description,
                'specificity' => $criterion->specificity
            ]);
        }

        Schema::drop('criteria_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('criteria', function (Blueprint $table) {
            $table->dropColumn(['description', 'specificity']);
        });
    }
}
