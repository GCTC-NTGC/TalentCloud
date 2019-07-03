<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Lang;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

use App\Models\Lookup\Department;

class AddTranslatedNameAndImpactToDepartments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('departments', function (Blueprint $table) {
            $table->json('name')->nullable();
            $table->json('impact')->nullable();
        });

        $departments = Department::all();
        $langEn = Lang::get('common/lookup/departments.departments', [], 'en');
        $langFr = Lang::get('common/lookup/departments.departments', [], 'fr');

        foreach ($departments as $department) {
            if (!array_key_exists($department->key, $langEn) || !array_key_exists($department->key, $langFr)) {
                continue;
            }
            $department
                ->setTranslation('name', 'en', $langEn[$department->key]['name'])
                ->setTranslation('name', 'fr', $langFr[$department->key]['name'])
                ->setTranslation('impact', 'en', $langEn[$department->key]['impact'])
                ->setTranslation('impact', 'fr', $langFr[$department->key]['impact'])
                ->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('departments', function (Blueprint $table) {
            $table->dropColumn(['name', 'impact']);
        });
    }
}
