<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateLanguageRequirements extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('language_requirements')->insert([
            ['id' => 1, 'name' => 'english'],
            ['id' => 2, 'name' => 'french'],
            ['id' => 3, 'name' => 'bilingual'],
        ]);

        DB::table('language_requirement_translations')->insert([
            ['id' => 1, 'language_requirement_id' => 1, 'locale' => 'en', 'value' => 'English essential'],
            ['id' => 2, 'language_requirement_id' => 1, 'locale' => 'fr', 'value' => 'Anglais essentiel'],
            ['id' => 3, 'language_requirement_id' => 2, 'locale' => 'en', 'value' => 'French essential'],
            ['id' => 4, 'language_requirement_id' => 2, 'locale' => 'fr', 'value' => 'Français essentiel'],
            ['id' => 5, 'language_requirement_id' => 3, 'locale' => 'en', 'value' => 'Bilingual'],
            ['id' => 6, 'language_requirement_id' => 3, 'locale' => 'fr', 'value' => 'Bilingue'],
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('language_requirements')->whereIn('id', [1, 2, 3])->delete();
        DB::table('language_requirement_translations')->whereIn('id', [1, 2, 3, 4, 5, 6])->delete();
    }
}
