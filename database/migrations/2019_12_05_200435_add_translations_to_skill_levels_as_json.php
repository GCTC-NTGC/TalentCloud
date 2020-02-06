<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTranslationsToSkillLevelsAsJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('skill_levels', function (Blueprint $table) {
            $table->json('value')->nullable();
        });

        $levels = DB::table('skill_levels')->get();

        foreach ($levels as $level) {
            $levelTranslationsEnglish = DB::table('skill_level_translations')->where('skill_level_id', $level->id)->where('locale', 'en')->first();
            $levelTranslationsFrench = DB::table('skill_level_translations')->where('skill_level_id', $level->id)->where('locale', 'fr')->first();

            $level->value = collect([$levelTranslationsEnglish->locale => $levelTranslationsEnglish->value, $levelTranslationsFrench->locale => $levelTranslationsFrench->value])->toJson();

            DB::table('skill_levels')->where('id', $level->id)->update([
                'id' => $level->id,
                'value' => $level->value,
            ]);
        }

        Schema::drop('skill_level_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('skill_levels', function (Blueprint $table) {
            $table->dropColumn('value');
        });
    }
}
