<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTranslationsToSecurityClearancesAsJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('security_clearances', function (Blueprint $table) {
            $table->json('value')->nullable();
        });

        $clearances = DB::table('security_clearances')->get();

        foreach ($clearances as $clearance) {
            $clearanceTranslationsEnglish = DB::table('security_clearance_translations')->where('security_clearance_id', $clearance->id)->where('locale', 'en')->first();
            $clearanceTranslationsFrench = DB::table('security_clearance_translations')->where('security_clearance_id', $clearance->id)->where('locale', 'fr')->first();

            $clearance->value = collect([$clearanceTranslationsEnglish->locale => $clearanceTranslationsEnglish->value, $clearanceTranslationsFrench->locale => $clearanceTranslationsFrench->value])->toJson();

            DB::table('security_clearances')->where('id', $clearance->id)->update([
                'id' => $clearance->id,
                'value' => $clearance->value,
            ]);
        }

        Schema::drop('security_clearance_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('security_clearances', function (Blueprint $table) {
            $table->dropColumn('value');
        });
    }
}
