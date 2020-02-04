<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTranslationsToCriteriaTypesAsJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('criteria_types', function (Blueprint $table) {
            $table->json('value')->nullable();
        });

        $types = DB::table('criteria_types')->get();

        foreach ($types as $type) {
            $typeTranslationsEnglish = DB::table('criteria_type_translations')->where('criteria_type_id', $type->id)->where('locale', 'en')->first();
            $typeTranslationsFrench = DB::table('criteria_type_translations')->where('criteria_type_id', $type->id)->where('locale', 'fr')->first();

            $type->value = collect([$typeTranslationsEnglish->locale => $typeTranslationsEnglish->value, $typeTranslationsFrench->locale => $typeTranslationsFrench->value])->toJson();

            DB::table('criteria_types')->where('id', $type->id)->update([
                'id' => $type->id,
                'value' => $type->value,
            ]);
        }

        Schema::drop('criteria_type_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('criteria_types', function (Blueprint $table) {
            $table->dropColumn('value');
        });
    }
}
