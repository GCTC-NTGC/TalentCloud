<?php

use Illuminate\Database\Migrations\Migration;

class UpdateFrequencies extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('frequencies')->where('name', 'sometimes')->update(['name' => 'occasionally']);
        DB::table('frequencies')->where('name', 'often')->update(['name' => 'frequently']);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('frequencies')->where('name', 'occasionally')->update(['name' => 'sometimes']);
        DB::table('frequencies')->where('name', 'frequently')->update(['name' => 'often']);
    }
}
