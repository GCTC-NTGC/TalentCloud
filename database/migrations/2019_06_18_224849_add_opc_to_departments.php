<?php

use Illuminate\Database\Migrations\Migration;

class AddOpcToDepartments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('departments')->insert([
            ['id' => 12, 'name' => 'office_privacy_comissioner'],
         ]);

        DB::table('department_translations')->insert([
            ['id' => 23, 'department_id' => 12, 'locale' => 'en', 'value' => 'Office of the Privacy Commissioner of Canada'],
            ['id' => 24, 'department_id' => 12, 'locale' => 'fr', 'value' => 'Commissariat à la protection de la vie privée du Canada'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('departments')->whereIn('id', [12])->delete();
        DB::table('department_translations')->whereIn('id', [23, 24])->delete();
    }
}
