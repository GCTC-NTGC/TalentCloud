<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateFileTypes extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('file_types')->insert([
            ['id' => 1, 'name' => 'word'],
            ['id' => 2, 'name' => 'powerpoint'],
            ['id' => 3, 'name' => 'video'],
            ['id' => 4, 'name' => 'publication'],
            ['id' => 5, 'name' => 'other'],
        ]);

        DB::table('file_type_translations')->insert([
            ['id' => 1, 'file_type_id' => 1, 'locale' => 'en', 'value' => 'Word Document'],
            ['id' => 2, 'file_type_id' => 1, 'locale' => 'fr', 'value' => 'Document Word'],
            ['id' => 3, 'file_type_id' => 2, 'locale' => 'en', 'value' => 'PowerPoint Presentation'],
            ['id' => 4, 'file_type_id' => 2, 'locale' => 'fr', 'value' => 'Présentation PowerPoint'],
            ['id' => 5, 'file_type_id' => 3, 'locale' => 'en', 'value' => 'Video'],
            ['id' => 6, 'file_type_id' => 3, 'locale' => 'fr', 'value' => 'Vidéo'],
            ['id' => 7, 'file_type_id' => 4, 'locale' => 'en', 'value' => 'Article Publication'],
            ['id' => 8, 'file_type_id' => 4, 'locale' => 'fr', 'value' => 'Publication d\'Article'],
            ['id' => 9, 'file_type_id' => 5, 'locale' => 'en', 'value' => 'Other'],
            ['id' => 10, 'file_type_id' => 5, 'locale' => 'fr', 'value' => 'Autre'],
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
