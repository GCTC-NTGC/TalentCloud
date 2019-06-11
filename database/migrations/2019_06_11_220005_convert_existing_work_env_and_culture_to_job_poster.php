<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class ConvertExistingWorkEnvAndCultureToJobPoster extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $jobs = DB::table('job_posters')->get();
        $locales = ['en', 'fr'];
        foreach ($jobs as $job) {
            $workEnv = DB::table('work_environments')->where('manager_id', $job->manager_id)->first();
            if ($workEnv) {
                // TODO: Add any non-translated fields
                foreach ($locales as $locale) {
                    $workEnvTrans = DB::table('work_environment_translations')->where('work_environment_id', $workEnv->id)->where('locale', $locale)->first();
                    if ($workEnvTrans) {
                        DB::table('job_poster_translations')->updateOrInsert(
                            ['job_poster_id' => $job->id, 'locale' => $locale],
                            ['work_env_description' => $workEnvTrans->things_to_know]
                        );
                    }
                }
            }
            $culture = DB::table('team_cultures')->where('manager_id', $job->manager_id)->first();
            if ($culture) {
                DB::table('jobs')->where('id', $job->id)->update(['team_size' => $culture->team_size]);
                foreach ($locales as $locale) {
                    $cultureTrans = DB::table('team_culture_translations')->where('team_culture_id', $culture->id)->where('locale', $locale)->first();
                    $cultureText = [$cultureTrans->operating_context, $cultureTrans->what_we_value, $cultureTrans->how_we_work];
                    $summaryText = implode("\n", $cultureText);
                    DB::table('job_poster_translations')->updateOrInsert(
                        ['job_poster_id' => $job->id, 'locale' => $locale],
                        ['work_env_description' => $summaryText]
                    );
                }
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Reversing this not necessary, its just filling fields.
    }
}
