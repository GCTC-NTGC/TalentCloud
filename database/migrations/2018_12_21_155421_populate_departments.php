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
             ['id' => 1, 'name' => 'treasury_board'],
             ['id' => 2, 'name' => 'natural_resources'],
             ['id' => 3, 'name' => 'transport'],
             ['id' => 4, 'name' => 'enviroment_and_climate_change'],
             ['id' => 5, 'name' => 'employment_and_social_development'],
             ['id' => 6, 'name' => 'global_affairs'],
             ['id' => 7, 'name' => 'fisheries_and_oceans'],
             ['id' => 8, 'name' => 'innovation_science'],
             ['id' => 9, 'name' => 'public_service_and_procurement'],
             ['id' => 10, 'name' => 'border_services_agency'],
         ]);

         DB::table('department_translations')->insert([
             ['id' => 1, 'department_id' => 1, 'locale' => 'en', 'value' => 'Treasury Board of Canada Secretariat'],
             ['id' => 2, 'department_id' => 1, 'locale' => 'fr', 'value' => 'Secrétariat du Conseil du Trésor du Canada'],
             ['id' => 3, 'department_id' => 2, 'locale' => 'en', 'value' => 'Natural Resources Canada'],
             ['id' => 4, 'department_id' => 2, 'locale' => 'fr', 'value' => 'Ressources naturelles Canada'],
             ['id' => 5, 'department_id' => 3, 'locale' => 'en', 'value' => 'Transport Canada'],
             ['id' => 6, 'department_id' => 3, 'locale' => 'fr', 'value' => 'Transports Canada'],
             ['id' => 7, 'department_id' => 4, 'locale' => 'en', 'value' => 'Environment and Climate Change Canada'],
             ['id' => 8, 'department_id' => 4, 'locale' => 'fr', 'value' => 'Environnement et Changement climatique Canada'],
             ['id' => 9, 'department_id' => 5, 'locale' => 'en', 'value' => 'Employment and Social Development Canada'],
             ['id' => 10, 'department_id' => 5, 'locale' => 'fr', 'value' => 'Emploi et Développement social Canada'],
             ['id' => 11, 'department_id' => 6, 'locale' => 'en', 'value' => 'Global Affairs Canada'],
             ['id' => 12, 'department_id' => 6, 'locale' => 'fr', 'value' => 'Affaires mondiales Canada'],
             ['id' => 13, 'department_id' => 7, 'locale' => 'en', 'value' => 'Fisheries and Oceans Canada'],
             ['id' => 14, 'department_id' => 7, 'locale' => 'fr', 'value' => 'Pêches et Océans Canada'],
             ['id' => 15, 'department_id' => 8, 'locale' => 'en', 'value' => 'Innovation, Science and Economic Development Canada'],
             ['id' => 16, 'department_id' => 8, 'locale' => 'fr', 'value' => 'Innovation, Sciences et Développement économique Canada'],
             ['id' => 17, 'department_id' => 9, 'locale' => 'en', 'value' => 'Public Services and Procurement Canada'],
             ['id' => 18, 'department_id' => 9, 'locale' => 'fr', 'value' => 'Services publics et Approvisionnement Canada'],
             ['id' => 19, 'department_id' => 10, 'locale' => 'en', 'value' => 'Canada Border Services Agency'],
             ['id' => 20, 'department_id' => 10, 'locale' => 'fr', 'value' => 'Agence des services frontaliers du Canada'],
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
