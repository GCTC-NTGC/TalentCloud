<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateDepartments extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::table('departments')->insert([
            ['name' => 'treasury_board'],
            ['name' => 'natural_resources'],
            ['name' => 'transport'],
            ['name' => 'enviroment_and_climate_change'],
            ['name' => 'employment_and_social_development'],
            ['name' => 'global_affairs'],
            ['name' => 'border_services_agency'],
            ['name' => 'fisheries_and_oceans'],
            ['name' => 'innovation_science'],
            ['name' => 'public_service_and_procurement'],
        ]);

        DB::table('department_translations')->insert([
            ['department_id' => 1, 'locale' => 'en', 'value' => 'Treasury Board of Canada Secretariat'],
            ['department_id' => 1, 'locale' => 'fr', 'value' => 'Secrétariat du Conseil du Trésor du Canada'],
            ['department_id' => 2, 'locale' => 'en', 'value' => 'Natural Resources Canada'],
            ['department_id' => 2, 'locale' => 'fr', 'value' => 'Ressources naturelles Canada'],
            ['department_id' => 3, 'locale' => 'en', 'value' => 'Transport Canada'],
            ['department_id' => 3, 'locale' => 'fr', 'value' => 'Transports Canada'],
            ['department_id' => 4, 'locale' => 'en', 'value' => 'Environment and Climate Change Canada'],
            ['department_id' => 4, 'locale' => 'fr', 'value' => 'Environnement et Changement climatique Canada'],
            ['department_id' => 5, 'locale' => 'en', 'value' => 'Employment and Social Development Canada'],
            ['department_id' => 5, 'locale' => 'fr', 'value' => 'Emploi et Développement social Canada'],
            ['department_id' => 6, 'locale' => 'en', 'value' => 'Global Affairs Canada'],
            ['department_id' => 6, 'locale' => 'fr', 'value' => 'Affaires mondiales Canada'],
            ['department_id' => 7, 'locale' => 'en', 'value' => 'Canada Border Services Agency'],
            ['department_id' => 7, 'locale' => 'fr', 'value' => 'Agence des services frontaliers du Canada'],
            ['department_id' => 8, 'locale' => 'en', 'value' => 'Fisheries and Oceans Canada'],
            ['department_id' => 8, 'locale' => 'fr', 'value' => 'Pêches et Océans Canada'],
            ['department_id' => 9, 'locale' => 'en', 'value' => 'Innovation, Science and Economic Development Canada'],
            ['department_id' => 9, 'locale' => 'fr', 'value' => 'Innovation, Sciences et Développement économique Canada'],
            ['department_id' => 10, 'locale' => 'en', 'value' => 'Public Services and Procurement Canada'],
            ['department_id' => 10, 'locale' => 'fr', 'value' => 'Services publics et Approvisionnement Canada'],
        ]);
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::table('departments')->whereIn('id', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])->delete();
        DB::table('department_translations')->whereIn('id', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])->delete();
    }
}
