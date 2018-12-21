<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateDegreeTypes extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('degree_types')->insert([
            ['id' => 1, 'name' => 'diploma'],
            ['id' => 2, 'name' => 'bachelors'],
            ['id' => 3, 'name' => 'masters'],
            ['id' => 4, 'name' => 'phd'],
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('degree_types')->whereIn('id', [1, 2, 3, 4])->delete();
    }
}
