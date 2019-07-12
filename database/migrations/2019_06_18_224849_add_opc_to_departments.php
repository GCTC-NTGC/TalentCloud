<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
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
            ['name' => 'office_privacy_comissioner'],
         ]);

        DB::table('department_translations')->insert([
            ['department_id' => 12, 'locale' => 'en', 'value' => 'Office of the Privacy Commissioner of Canada'],
            ['department_id' => 12, 'locale' => 'fr', 'value' => 'Commissariat à la protection de la vie privée du Canada'],
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
