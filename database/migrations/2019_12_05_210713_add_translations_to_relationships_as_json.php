<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTranslationsToRelationshipsAsJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('relationships', function (Blueprint $table) {
            $table->json('value')->nullable();
        });

        $relationships = DB::table('relationships')->get();

        foreach ($relationships as $relationship) {
            $relationshipTranslationsEnglish = DB::table('relationship_translations')->where('relationship_id', $relationship->id)->where('locale', 'en')->first();
            $relationshipTranslationsFrench = DB::table('relationship_translations')->where('relationship_id', $relationship->id)->where('locale', 'fr')->first();

            $relationship->value = collect([$relationshipTranslationsEnglish->locale => $relationshipTranslationsEnglish->value, $relationshipTranslationsFrench->locale => $relationshipTranslationsFrench->value])->toJson();

            DB::table('relationships')->where('id', $relationship->id)->update([
                'id' => $relationship->id,
                'value' => $relationship->value,
            ]);
        }

        Schema::drop('relationship_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('relationships', function (Blueprint $table) {
            $table->dropColumn('value');
        });
    }
}
