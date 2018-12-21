<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateRelationships extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('relationships')->insert([
            ['id' => 1, 'name' => 'superior'],
            ['id' => 2, 'name' => 'coworker'],
            ['id' => 3, 'name' => 'subordinate'],
        ]);

        DB::table('relationship_translations')->insert([
            ['id' => 1, 'relationship_id' => 1, 'locale' => 'en', 'value' => 'Superior'],
            ['id' => 2, 'relationship_id' => 1, 'locale' => 'fr', 'value' => 'Supérieur'],
            ['id' => 3, 'relationship_id' => 2, 'locale' => 'en', 'value' => 'Coworker'],
            ['id' => 4, 'relationship_id' => 2, 'locale' => 'fr', 'value' => 'Collaborateur'],
            ['id' => 5, 'relationship_id' => 3, 'locale' => 'en', 'value' => 'Subordinate'],
            ['id' => 6, 'relationship_id' => 3, 'locale' => 'fr', 'value' => 'Subalterne'],
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('relationships')->whereIn('id', [1, 2, 3])->delete();
        DB::table('relationship_translations')->whereIn('id', [1, 2, 3, 4, 5, 6])->delete();
    }
}
