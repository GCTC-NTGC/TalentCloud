<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateLanguageRequirements extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('language_requirements')->whereIn('id', [3])->update(
            ['name' => 'bilingual_intermediate']
        );

        DB::table('language_requirement_translations')->whereIn('id', [5])->update(
            ['value' => 'Bilingual - Intermediate']
        );

        DB::table('language_requirement_translations')->whereIn('id', [6])->update(
            ['value' => 'Bilingue - Intermediare']
        );

        DB::table('language_requirements')->insert([
            ['id' => 4, 'name' => 'bilingual_advanced'],
            ['id' => 5, 'name' => 'english_or_french']
        ]);

        DB::table('language_requirement_translations')->insert([
            ['id' => 7, 'locale' => 'en', 'language_requirement_id' => 4, 'value' => 'Bilingual - Advanced'],
            ['id' => 8, 'locale' => 'fr', 'language_requirement_id' => 4, 'value' => 'Bilingue - Avancé'],
            ['id' => 9, 'locale' => 'en', 'language_requirement_id' => 5, 'value' => 'English or French'],
            ['id' => 10, 'locale' => 'fr', 'language_requirement_id' => 5, 'value' => 'Anglais ou Français']
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('language_requirements')->whereIn('id', [3])->update(
            ['name' => 'bilingual']
        );

        DB::table('language_requirements')->whereIn('id', [4, 5])->delete();

        DB::table('language_requirement_translations')->whereIn('id', [5])->update(
            ['value' => 'Bilingual - Advanced']
        );

        DB::table('language_requirement_translations')->whereIn('id', [6])->update(
            ['value' => 'Bilingue - Avancé']
        );

        DB::table('language_requirement_translations')->whereIn('id', [7, 8, 9, 10])->delete();
    }
}
