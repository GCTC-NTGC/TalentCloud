<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTranslationsToLanguageRequirementsAsJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('language_requirements', function (Blueprint $table) {
            $table->json('value')->nullable();
        });

        $requirements = DB::table('language_requirements')->get();

        foreach ($requirements as $requirement) {
            $requirementTranslationsEnglish = DB::table('language_requirement_translations')->where('language_requirement_id', $requirement->id)->where('locale', 'en')->first();
            $requirementTranslationsFrench = DB::table('language_requirement_translations')->where('language_requirement_id', $requirement->id)->where('locale', 'fr')->first();

            $requirement->value = collect([$requirementTranslationsEnglish->locale => $requirementTranslationsEnglish->value, $requirementTranslationsFrench->locale => $requirementTranslationsFrench->value])->toJson();

            DB::table('language_requirements')->where('id', $requirement->id)->update([
                'id' => $requirement->id,
                'value' => $requirement->value,
            ]);
        }

        Schema::drop('language_requirement_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('language_requirements', function (Blueprint $table) {
            $table->dropColumn('value');
        });
    }
}
