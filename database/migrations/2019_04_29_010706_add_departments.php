<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDepartments extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('departments')->insert([
            ['id' => 11, 'name' => 'department_national_defence'],
        ]);

        DB::table('department_translations')->insert([
            ['id' => 21, 'department_id' => 11, 'locale' => 'en', 'value' => 'Department of National Defence'],
            ['id' => 22, 'department_id' => 11, 'locale' => 'fr', 'value' => 'Ministère de la Défense nationale'],
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('departments')->whereIn('id', [11])->delete();
        DB::table('department_translations')->whereIn('id', [21, 22])->delete();
    }
}
