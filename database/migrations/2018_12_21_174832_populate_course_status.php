<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateCourseStatus extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('course_status')->insert([
            ['id' => 1, 'name' => 'certificate_granted'],
            ['id' => 2, 'name' => 'credits_towards_degree'],
            ['id' => 3, 'name' => 'audited'],
            ['id' => 4, 'name' => 'online_no_proof'],
            ['id' => 5, 'name' => 'online_certificate'],
            ['id' => 6, 'name' => 'learning_in_progress'],
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('course_status')->whereIn('id', [1, 2, 3, 4, 5, 6])->delete();
    }
}
