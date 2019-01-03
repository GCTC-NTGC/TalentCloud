<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateProvinces extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('provinces')->insert([
            ['id' => 1, 'name' => 'ab'],
            ['id' => 2, 'name' => 'bc'],
            ['id' => 3, 'name' => 'mb'],
            ['id' => 4, 'name' => 'nl'],
            ['id' => 5, 'name' => 'nb'],
            ['id' => 6, 'name' => 'ns'],
            ['id' => 7, 'name' => 'nu'],
            ['id' => 8, 'name' => 'nt'],
            ['id' => 9, 'name' => 'on'],
            ['id' => 10, 'name' => 'pe'],
            ['id' => 11, 'name' => 'qc'],
            ['id' => 12, 'name' => 'sk'],
            ['id' => 13, 'name' => 'ty'],
        ]);

        DB::table('province_translations')->insert([
            ['id' => 1, 'province_id' => 1, 'locale' => 'en', 'value' => 'Alberta'],
            ['id' => 2, 'province_id' => 1, 'locale' => 'fr', 'value' => 'Alberta'],
            ['id' => 3, 'province_id' => 2, 'locale' => 'en', 'value' => 'British Columbia'],
            ['id' => 4, 'province_id' => 2, 'locale' => 'fr', 'value' => 'Colombie-Britannique'],
            ['id' => 5, 'province_id' => 3, 'locale' => 'en', 'value' => 'Manitoba'],
            ['id' => 6, 'province_id' => 3, 'locale' => 'fr', 'value' => 'Manitoba'],
            ['id' => 7, 'province_id' => 4, 'locale' => 'en', 'value' => 'New Brunswick'],
            ['id' => 8, 'province_id' => 4, 'locale' => 'fr', 'value' => 'Nouveau-Brunswick'],
            ['id' => 9, 'province_id' => 5, 'locale' => 'en', 'value' => 'Newfoundland and Labrador'],
            ['id' => 10, 'province_id' => 5, 'locale' => 'fr', 'value' => 'Terre-Neuve-et-Labrador'],
            ['id' => 11, 'province_id' => 6, 'locale' => 'en', 'value' => 'Nova Scotia'],
            ['id' => 12, 'province_id' => 6, 'locale' => 'fr', 'value' => 'Nouvelle-Écosse'],
            ['id' => 13, 'province_id' => 7, 'locale' => 'en', 'value' => 'Northwest Territories'],
            ['id' => 14, 'province_id' => 7, 'locale' => 'fr', 'value' => 'Territoires du Nord-Ouest'],
            ['id' => 15, 'province_id' => 8, 'locale' => 'en', 'value' => 'Nunavut'],
            ['id' => 16, 'province_id' => 8, 'locale' => 'fr', 'value' => 'Nunavut'],
            ['id' => 17, 'province_id' => 9, 'locale' => 'en', 'value' => 'Ontario'],
            ['id' => 18, 'province_id' => 9, 'locale' => 'fr', 'value' => 'Ontario'],
            ['id' => 19, 'province_id' => 10, 'locale' => 'en', 'value' => 'Prince Edward Island'],
            ['id' => 20, 'province_id' => 10, 'locale' => 'fr', 'value' => 'Île-du-Prince-Édouard'],
            ['id' => 21, 'province_id' => 11, 'locale' => 'en', 'value' => 'Quebec'],
            ['id' => 22, 'province_id' => 11, 'locale' => 'fr', 'value' => 'Québec'],
            ['id' => 23, 'province_id' => 12, 'locale' => 'en', 'value' => 'Saskatchewan'],
            ['id' => 24, 'province_id' => 12, 'locale' => 'fr', 'value' => 'Saskatchewan'],
            ['id' => 25, 'province_id' => 13, 'locale' => 'en', 'value' => 'Yukon'],
            ['id' => 26, 'province_id' => 13, 'locale' => 'fr', 'value' => 'Yukon'],
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('provinces')->whereIn('id', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])->delete();
        DB::table('province_translations')->whereIn('id', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26])->delete();
    }
}
