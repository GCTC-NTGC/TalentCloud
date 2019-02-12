<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateUserRoles extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('user_roles')->insert([
            ['id' => 1, 'name' => 'applicant'],
            ['id' => 2, 'name' => 'manager'],
            ['id' => 3, 'name' => 'admin'],
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('user_roles')->whereIn('id', [1, 2, 3])->delete();
    }
}
