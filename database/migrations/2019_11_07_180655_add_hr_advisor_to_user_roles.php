<?php

use Illuminate\Database\Migrations\Migration;

class AddHrAdvisorToUserRoles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('user_roles')->insert([
            ['id' => 4, 'name' => 'hr_advisor'],
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('user_roles')->whereIn('id', [4])->delete();
    }
}
