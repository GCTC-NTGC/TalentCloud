<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTranslationsToTeamCultureAsJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('team_cultures', function (Blueprint $table) {
            $table->json('narrative_text')->nullable();
            $table->json('operating_context')->nullable();
            $table->json('what_we_value')->nullable();
            $table->json('how_we_work')->nullable();
        });

        $cultures = DB::table('team_cultures')->get();

        foreach ($cultures as $culture) {
            $cultureTranslationsEnglish = DB::table('team_culture_translations')->where('team_culture_id', $culture->id)->where('locale', 'en')->first();
            $cultureTranslationsFrench = DB::table('team_culture_translations')->where('team_culture_id', $culture->id)->where('locale', 'fr')->first();

            $culture->narrative_text = collect([$cultureTranslationsEnglish->locale => $cultureTranslationsEnglish->narrative_text, $cultureTranslationsFrench->locale => $cultureTranslationsFrench->narrative_text])->toJson();

            $culture->operating_context = collect([$cultureTranslationsEnglish->locale => $cultureTranslationsEnglish->operating_context, $cultureTranslationsFrench->locale => $cultureTranslationsFrench->operating_context])->toJson();

            $culture->what_we_value = collect([$cultureTranslationsEnglish->locale => $cultureTranslationsEnglish->what_we_value, $cultureTranslationsFrench->locale => $cultureTranslationsFrench->what_we_value])->toJson();

            $culture->how_we_work = collect([$cultureTranslationsEnglish->locale => $cultureTranslationsEnglish->how_we_work, $cultureTranslationsFrench->locale => $cultureTranslationsFrench->how_we_work])->toJson();

            DB::table('team_cultures')->where('id', $culture->id)->update([
                'id' => $culture->id,
                'narrative_text' => $culture->narrative_text,
                'operating_context' => $culture->operating_context,
                'what_we_value' => $culture->what_we_value,
                'how_we_work' => $culture->how_we_work
            ]);
        }

        Schema::drop('team_culture_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('team_cultures', function (Blueprint $table) {
            $table->dropColumn(['narrative_text', 'operating_context', 'what_we_value', 'how_we_work']);
        });
    }
}
