<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateExperienceLevels extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('experience_levels')->insert([
            ['id' => 1, 'name' => '1 or less years'],
            ['id' => 2, 'name' => '2 - 3 years'],
            ['id' => 3, 'name' => '4 - 5 years'],
            ['id' => 4, 'name' => '6 - 7 years'],
            ['id' => 5, 'name' => '8 or more years'],
        ]);

        DB::table('experience_level_translations')->insert([
            ['id' => 1, 'experience_level_id' => 1, 'locale' => 'en', 'value' => '1 or less years'],
            ['id' => 2, 'experience_level_id' => 1, 'locale' => 'fr', 'value' => 'Un an ou moins'],
            ['id' => 3, 'experience_level_id' => 2, 'locale' => 'en', 'value' => '2 - 3 years'],
            ['id' => 4, 'experience_level_id' => 2, 'locale' => 'fr', 'value' => '2 - 3 ans'],
            ['id' => 5, 'experience_level_id' => 3, 'locale' => 'en', 'value' => '4 - 5 years'],
            ['id' => 6, 'experience_level_id' => 3, 'locale' => 'fr', 'value' => '4 - 5 ans'],
            ['id' => 7, 'experience_level_id' => 4, 'locale' => 'en', 'value' => '6 - 7 years'],
            ['id' => 8, 'experience_level_id' => 4, 'locale' => 'fr', 'value' => '6 - 7 ans'],
            ['id' => 9, 'experience_level_id' => 5, 'locale' => 'en', 'value' => '8 or more years'],
            ['id' => 10, 'experience_level_id' => 5, 'locale' => 'fr', 'value' => 'Huit ans ou plus'],
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('experience_levels')->whereIn('id', [1, 2, 3, 4, 5])->delete();
        DB::table('experience_level_translations')->whereIn('id', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])->delete();
    }
}
