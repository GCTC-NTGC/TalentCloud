<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateSecurityClearances extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('security_clearances')->insert([
            ['id' => 1, 'name' => 'reliability'],
            ['id' => 2, 'name' => 'secret'],
            ['id' => 3, 'name' => 'top_secret'],
        ]);

        DB::table('security_clearance_translations')->insert([
            ['id' => 1, 'security_clearance_id' => 1, 'locale' => 'en', 'value' => 'Reliability'],
            ['id' => 2, 'security_clearance_id' => 1, 'locale' => 'fr', 'value' => 'Fiabilité'],
            ['id' => 3, 'security_clearance_id' => 2, 'locale' => 'en', 'value' => 'Secret'],
            ['id' => 4, 'security_clearance_id' => 2, 'locale' => 'fr', 'value' => 'Secret'],
            ['id' => 5, 'security_clearance_id' => 3, 'locale' => 'en', 'value' => 'Top Secret'],
            ['id' => 6, 'security_clearance_id' => 3, 'locale' => 'fr', 'value' => 'Très secret'],
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('security_clearances')->whereIn('id', [1, 2, 3])->delete();
        DB::table('security_clearance_translations')->whereIn('id', [1, 2, 3, 4, 5, 6])->delete();
    }
}
