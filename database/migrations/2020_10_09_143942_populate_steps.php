<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class PopulateSteps extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('steps')->insert([
            ['id' => 1, 'name' => 'basic'],
            ['id' => 2, 'name' => 'experience'],
            ['id' => 3, 'name' => 'skills'],
            ['id' => 4, 'name' => 'fit'],
            ['id' => 5, 'name' => 'review'],
            ['id' => 6, 'name' => 'submission'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('steps')->whereIn('id', [1, 2, 3, 4, 5, 6])->delete();
    }
}
