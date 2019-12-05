<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTranslationsToFileTypesAsJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('file_types', function (Blueprint $table) {
            $table->json('value')->nullable();
        });

        $types = DB::table('file_types')->get();

        foreach ($types as $type) {
            $typeTranslationsEnglish = DB::table('file_type_translations')->where('file_type_id', $type->id)->where('locale', 'en')->first();
            $typeTranslationsFrench = DB::table('file_type_translations')->where('file_type_id', $type->id)->where('locale', 'fr')->first();

            $type->value = collect([$typeTranslationsEnglish->locale => $typeTranslationsEnglish->value, $typeTranslationsFrench->locale => $typeTranslationsFrench->value])->toJson();

            DB::table('file_types')->where('id', $type->id)->update([
                'id' => $type->id,
                'value' => $type->value,
            ]);
        }

        Schema::drop('file_type_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('file_types', function (Blueprint $table) {
            $table->dropColumn('value');
        });
    }
}
