<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateFrequencies extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('frequencies')->insert([
            ['id' => 1, 'name' => 'never'],
            ['id' => 2, 'name' => 'rarely'],
            ['id' => 3, 'name' => 'sometimes'],
            ['id' => 4, 'name' => 'often'],
            ['id' => 5, 'name' => 'always'],
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('frequencies')->whereIn('id', [1, 2, 3, 4, 5])->delete();
    }
}
