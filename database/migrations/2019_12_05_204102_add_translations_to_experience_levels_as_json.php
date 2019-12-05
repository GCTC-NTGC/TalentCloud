<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTranslationsToExperienceLevelsAsJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('experience_levels', function (Blueprint $table) {
            $table->json('value')->nullable();
        });

        $levels = DB::table('experience_levels')->get();

        foreach ($levels as $level) {
            $levelTranslationsEnglish = DB::table('experience_level_translations')->where('experience_level_id', $level->id)->where('locale', 'en')->first();
            $levelTranslationsFrench = DB::table('experience_level_translations')->where('experience_level_id', $level->id)->where('locale', 'fr')->first();

            $level->value = collect([$levelTranslationsEnglish->locale => $levelTranslationsEnglish->value, $levelTranslationsFrench->locale => $levelTranslationsFrench->value])->toJson();

            DB::table('experience_levels')->where('id', $level->id)->update([
                'id' => $level->id,
                'value' => $level->value,
            ]);
        }

        Schema::drop('experience_level_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('experience_levels', function (Blueprint $table) {
            $table->dropColumn('value');
        });
    }
}
