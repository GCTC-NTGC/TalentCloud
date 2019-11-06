<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameUserRolesForDemo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('user_roles')->where('name', 'applicant')->update(['name' => 'basic']);
        DB::table('user_roles')->where('name', 'manager')->update(['name' => 'upgradedManager']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('user_roles')->where('name', 'basic')->update(['name' => 'applicant']);
        DB::table('user_roles')->where('name', 'upgradedManager')->update(['name' => 'manager']);
    }
}
