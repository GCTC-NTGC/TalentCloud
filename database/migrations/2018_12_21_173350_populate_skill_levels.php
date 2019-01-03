<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateSkillLevels extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('skill_levels')->insert([
            ['id' => 1, 'name' => 'basic'],
            ['id' => 2, 'name' => 'intermediate'],
            ['id' => 3, 'name' => 'advanced'],
            ['id' => 4, 'name' => 'expert'],
        ]);

        DB::table('skill_level_translations')->insert([
            ['id' => 1, 'skill_level_id' => 1, 'locale' => 'en', 'value' => 'Basic'],
            ['id' => 2, 'skill_level_id' => 1, 'locale' => 'fr', 'value' => 'Débutant'],
            ['id' => 3, 'skill_level_id' => 2, 'locale' => 'en', 'value' => 'Intermediate'],
            ['id' => 4, 'skill_level_id' => 2, 'locale' => 'fr', 'value' => 'Intermédiaire'],
            ['id' => 5, 'skill_level_id' => 3, 'locale' => 'en', 'value' => 'Advanced'],
            ['id' => 6, 'skill_level_id' => 3, 'locale' => 'fr', 'value' => 'Avancé'],
            ['id' => 7, 'skill_level_id' => 4, 'locale' => 'en', 'value' => 'Expert'],
            ['id' => 8, 'skill_level_id' => 4, 'locale' => 'fr', 'value' => 'Expert'],
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('skill_levels')->whereIn('id', [1, 2, 3, 4])->delete();
        DB::table('skill_level_translations')->whereIn('id', [1, 2, 3, 4, 5, 6, 7, 8])->delete();
    }
}
