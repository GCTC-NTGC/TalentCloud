<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTranslationsToWorkEnvironmentAsJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('work_environments', function (Blueprint $table) {
            $table->json('things_to_know')->nullable();
        });

        $environments = DB::table('work_environments')->get();

        foreach ($environments as $env) {
            $envTranslationsEnglish = DB::table('work_environment_translations')->where('work_environment_id', $env->id)->where('locale', 'en')->first();
            $envTranslationsFrench = DB::table('work_environment_translations')->where('work_environment_id', $env->id)->where('locale', 'fr')->first();

            $env->things_to_know = collect([$envTranslationsEnglish->locale => $envTranslationsEnglish->things_to_know, $envTranslationsFrench->locale => $envTranslationsFrench->things_to_know])->toJson();

            DB::table('work_environments')->where('id', $env->id)->update([
                'id' => $env->id,
                'things_to_know' => $env->things_to_know,
            ]);
        }

        Schema::drop('work_environment_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('work_environments', function (Blueprint $table) {
            $table->dropColumn('things_to_know');
        });
    }
}
