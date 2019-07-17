<?php

use Illuminate\Database\Migrations\Migration;

class AddNrcToDepartments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('departments')->insert([
            ['id' => 13, 'name' => 'national_research_council']
        ]);

        DB::table('department_translations')->insert([
            ['id' => 25, 'department_id' => '13', 'locale' => 'en', 'value' => 'National Research Council Canada'],
            ['id' => 26, 'department_id' => '13', 'locale' => 'fr', 'value' => 'Conseil national de recherches Canada'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('departments')->whereIn('id', [13])->delete();
        DB::table('department_translations')->whereIn('id', [25, 26])->delete();
    }
}
