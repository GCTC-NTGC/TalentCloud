<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulatePreferredLanguages extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('preferred_languages')->insert([
            ['id' => 1, 'name' => 'en'],
            ['id' => 2, 'name' => 'fr'],
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('preferred_languages')->whereIn('id', [1, 2])->delete();
    }
}
