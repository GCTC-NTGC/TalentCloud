<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTranslationsToJobPostersAsJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('job_posters', function (Blueprint $table) {
            $table->json('city')->nullable();
            $table->json('title')->nullable();
            $table->json('dept_impact')->nullable();
            $table->json('team_impact')->nullable();
            $table->json('hire_impact')->nullable();
            $table->json('division')->nullable();
            $table->json('education')->nullable();
            $table->json('work_env_description')->nullable();
            $table->json('culture_summary')->nullable();
            $table->json('culture_special')->nullable();
        });

        $job_posters = DB::table('job_posters')->get();

        foreach ($job_posters as $job) {
            $jobTranslationsEnglish = DB::table('job_poster_translations')->where('job_poster_id', $job->id)->where('locale', 'en')->first();
            $jobTranslationsFrench = DB::table('job_poster_translations')->where('job_poster_id', $job->id)->where('locale', 'fr')->first();

            $job->city = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->value, $jobTranslationsFrench->locale => $jobTranslationsFrench->value])->toJson();

            $job->title = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->value, $jobTranslationsFrench->locale => $jobTranslationsFrench->value])->toJson();

            $job->dept_impact = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->value, $jobTranslationsFrench->locale => $jobTranslationsFrench->value])->toJson();

            $job->team_impact = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->value, $jobTranslationsFrench->locale => $jobTranslationsFrench->value])->toJson();

            $job->hire_impact = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->value, $jobTranslationsFrench->locale => $jobTranslationsFrench->value])->toJson();

            $job->division = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->value, $jobTranslationsFrench->locale => $jobTranslationsFrench->value])->toJson();

            $job->education = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->value, $jobTranslationsFrench->locale => $jobTranslationsFrench->value])->toJson();

            $job->work_env_description = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->value, $jobTranslationsFrench->locale => $jobTranslationsFrench->value])->toJson();

            $job->culture_summary = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->value, $jobTranslationsFrench->locale => $jobTranslationsFrench->value])->toJson();

            $job->culture_special = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->value, $jobTranslationsFrench->locale => $jobTranslationsFrench->value])->toJson();

            DB::table('job_posters')->where('id', $job->id)->update([
                'city' => $job->city,
                'title' => $job->title,
                'dept_impact' => $job->dept_impact,
                'team_impact' => $job->team_impact,
                'hire_impact' => $job->hire_impact,
                'division' => $job->division,
                'education' => $job->education,
                'work_env_description' => $job->work_env_description,
                'culture_summary' => $job->culture_summary,
                'culture_special' => $job->culture_special,
            ]);
        }

        Schema::drop('job_poster_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('job_posters', function (Blueprint $table) {
            $table->dropColumn([
                'city',
                'title',
                'dept_impact',
                'team_impact',
                'hire_impact',
                'division',
                'education',
                'work_env_description',
                'culture_summary',
                'culture_special'
            ]);
        });
    }
}
