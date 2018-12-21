<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateJobTerms extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('job_terms')->insert([
            ['id' => 1, 'name' => 'week'],
            ['id' => 2, 'name' => 'month'],
            ['id' => 3, 'name' => 'year'],
            ['id' => 4, 'name' => 'permanent'],
        ]);

        DB::table('file_type_translations')->insert([
            ['id' => 1, 'file_type_id' => 1, 'locale' => 'en', 'value' => 'week'],
            ['id' => 2, 'file_type_id' => 1, 'locale' => 'fr', 'value' => 'semaine'],
            ['id' => 3, 'file_type_id' => 2, 'locale' => 'en', 'value' => 'month'],
            ['id' => 4, 'file_type_id' => 2, 'locale' => 'fr', 'value' => 'mois'],
            ['id' => 5, 'file_type_id' => 3, 'locale' => 'en', 'value' => 'year'],
            ['id' => 6, 'file_type_id' => 3, 'locale' => 'fr', 'value' => 'an'],
            ['id' => 7, 'file_type_id' => 4, 'locale' => 'en', 'value' => 'permanent'],
            ['id' => 8, 'file_type_id' => 4, 'locale' => 'fr', 'value' => 'permanent'],
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('job_terms')->whereIn('id', [1, 2, 3, 4])->delete();
        DB::table('job_term_translations')->whereIn('id', [1, 2, 3, 4, 5, 6, 7, 8])->delete();
    }
}
