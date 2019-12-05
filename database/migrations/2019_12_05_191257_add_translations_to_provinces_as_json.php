<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTranslationsToProvincesAsJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('provinces', function (Blueprint $table) {
            $table->json('value')->nullable();
        });

        $provinces = DB::table('provinces')->get();

        foreach ($provinces as $province) {
            $provinceTranslationsEnglish = DB::table('province_translations')->where('province_id', $province->id)->where('locale', 'en')->first();
            $provinceTranslationsFrench = DB::table('province_translations')->where('province_id', $province->id)->where('locale', 'fr')->first();

            $province->value = collect([$provinceTranslationsEnglish->locale => $provinceTranslationsEnglish->value, $provinceTranslationsFrench->locale => $provinceTranslationsFrench->value])->toJson();

            DB::table('provinces')->where('id', $province->id)->update([
                'id' => $province->id,
                'value' => $province->value,
            ]);
        }

        Schema::drop('province_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('provinces', function (Blueprint $table) {
            $table->dropColumn('value');
        });
    }
}
