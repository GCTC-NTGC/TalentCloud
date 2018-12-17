<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateSkills13December2018 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('skills')->insert([
            ['id' => 71, 'name' => 'cloud_architecture_for_mobile_and_applications', 'skill_type_id'=>2],
            ['id' => 72, 'name' => 'cloud_computing_platform_configuration', 'skill_type_id'=>2],
            ['id' => 73, 'name' => 'strategy_development', 'skill_type_id'=>2],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('skills')->whereIn('id', [71, 72, 73])->delete();
    }
}
