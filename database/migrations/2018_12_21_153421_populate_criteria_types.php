<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateCriteriaTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
         DB::table('criteria_types')->insert([
             ['id' => 1, 'name' => 'essential'],
             ['id' => 2, 'name' => 'asset'],
         ]);

         DB::table('criteria_type_translations')->insert([
             ['id' => 1, 'criteria_type_id' => 1, 'locale' => 'en', 'value' => 'Need to Have', 'description' => ''],
             ['id' => 2, 'criteria_type_id' => 1, 'locale' => 'fr', 'value' => 'Qualifications essentielles', 'description' => ''],
             ['id' => 3, 'criteria_type_id' => 2, 'locale' => 'en', 'value' => 'Nice to Have', 'description' => ''],
             ['id' => 4, 'criteria_type_id' => 2, 'locale' => 'fr', 'value' => 'Qualifications constituant un atout', 'description' => ''],
         ]);
     }

     /**
      * Reverse the migrations.
      *
      * @return void
      */
     public function down()
     {
         DB::table('criteria_types')->whereIn('id', [1, 2])->delete();
         DB::table('criteria_type_translations')->whereIn('id', [1, 2, 3, 4])->delete();
     }
 }
