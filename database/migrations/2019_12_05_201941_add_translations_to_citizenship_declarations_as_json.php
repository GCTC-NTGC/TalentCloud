<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTranslationsToCitizenshipDeclarationsAsJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('citizenship_declarations', function (Blueprint $table) {
            $table->json('value')->nullable();
        });

        $declarations = DB::table('citizenship_declarations')->get();

        foreach ($declarations as $declaration) {
            $declarationTranslationsEnglish = DB::table('citizenship_declaration_translations')->where('citizenship_declaration_id', $declaration->id)->where('locale', 'en')->first();
            $declarationTranslationsFrench = DB::table('citizenship_declaration_translations')->where('citizenship_declaration_id', $declaration->id)->where('locale', 'fr')->first();

            $declaration->value = collect([$declarationTranslationsEnglish->locale => $declarationTranslationsEnglish->value, $declarationTranslationsFrench->locale => $declarationTranslationsFrench->value])->toJson();

            DB::table('citizenship_declarations')->where('id', $declaration->id)->update([
                'id' => $declaration->id,
                'value' => $declaration->value,
            ]);
        }

        Schema::drop('citizenship_declaration_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('citizenship_declarations', function (Blueprint $table) {
            $table->dropColumn('value');
        });
    }
}
