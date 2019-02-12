<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateVeteranStatuses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('veteran_statuses')->insert([
            ['id' => 1, 'name' => 'none'],
            ['id' => 2, 'name' => 'current'],
            ['id' => 3, 'name' => 'past'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('veteran_statuses')->whereIn('id', [1, 2, 3])->delete();
    }
}
