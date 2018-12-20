<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateCitizenshipDeclarations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('citizenship_declarations')->insert() {
            ['id' => 1, 'name' => 'citizen'],
            ['id' => 2, 'name' => 'permanent_resident'],
            ['id' => 3, 'name' => 'work_permit_open'],
            ['id' => 4, 'name' => 'work_permit_closed'],
            ['id' => 5, 'name' => 'not_entitled'],
        });

        DB::table('citizenship_declaration_translations')->insert() {
            ['id' => 1, 'citizenship_declaration_id' => 1, 'locale' => 'en', 'value' => 'Canadian Citizen'],
            ['id' => 2, 'citizenship_declaration_id' => 1, 'locale' => 'fr', 'value' => 'Citoyen Canadien'],
            ['id' => 3, 'citizenship_declaration_id' => 2, 'locale' => 'en', 'value' => 'Permanent Resident of Canada'],
            ['id' => 4, 'citizenship_declaration_id' => 2, 'locale' => 'fr', 'value' => 'Résident Permanent du Canada'],
            ['id' => 5, 'citizenship_declaration_id' => 3, 'locale' => 'en', 'value' => 'Open - Work Permit'],
            ['id' => 6, 'citizenship_declaration_id' => 3, 'locale' => 'fr', 'value' => 'Open - Permis de Travail'],
            ['id' => 7, 'citizenship_declaration_id' => 4, 'locale' => 'en', 'value' => 'Closed - Work Permit'],
            ['id' => 8, 'citizenship_declaration_id' => 4, 'locale' => 'fr', 'value' => 'Fermé - Permis de Travail'],
            ['id' => 9, 'citizenship_declaration_id' => 5, 'locale' => 'en', 'value' => 'I am currently not entitled to work in Canada'],
            ['id' => 10, 'citizenship_declaration_id' => 5, 'locale' => 'fr', 'value' => 'Je nai Actuellement pas le Droit de Travailler au Canada'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('citizenship_declarations')->whereIn('id', [1, 2, 3, 4, 5])->delete();
        DB::table('citizenship_declaration_translations')->whereIn('id', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])->delete();
    }
}
