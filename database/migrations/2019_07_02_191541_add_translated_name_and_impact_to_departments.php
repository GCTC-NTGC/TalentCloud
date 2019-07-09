<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

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

        $departments = DB::table('departments')->get();

        foreach ($departments as $department) {
            $departmentTranslationsEnglish = DB::table('department_translations')->where('department_id', $department->id)->where('locale', 'en')->first();
            $departmentTranslationsFrench = DB::table('department_translations')->where('department_id', $department->id)->where('locale', 'fr')->first();

            $department->name = collect([$departmentTranslationsEnglish->locale => $departmentTranslationsEnglish->value, $departmentTranslationsFrench->locale => $departmentTranslationsFrench->value])->toJson();

            DB::table('departments')->where('id', $department->id)->update([
                'name' => $department->name,
                // 'impact' => $department->id
            ]);
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
