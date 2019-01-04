<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateLanguageRequirementsEnOrFr extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('language_requirements')->insert([
            ['id' => 4, 'name' => 'english_or_french'],
        ]);

        DB::table('language_requirement_translations')->insert([
            ['id' => 7, 'language_requirement_id' => 4, 'locale' => 'en', 'value' => 'English or French'],
            ['id' => 8, 'language_requirement_id' => 4, 'locale' => 'fr', 'value' => 'Anglais ou Français'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('language_requirements')->whereIn('id', [4])->delete();
        DB::table('language_requirement_translations')->whereIn('id', [7, 8])->delete();
    }
}
