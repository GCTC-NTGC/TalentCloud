<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateAssessmentTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('assessment_types')->insert([
            ['id' => 1, 'key' => 'interview'],
            ['id' => 2, 'key' => 'written_test'],
            ['id' => 3, 'key' => 'portfolio'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('assessment_types')->whereIn('id', [1, 2, 3])->delete();
    }
}
