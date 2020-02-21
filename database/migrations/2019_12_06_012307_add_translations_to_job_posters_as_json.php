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

            if ($jobTranslationsEnglish === null) {
                $jobTranslationsEnglish = new stdClass();
                $jobTranslationsEnglish->locale = 'en';
                $jobTranslationsEnglish->city = '';
                $jobTranslationsEnglish->title = '';
                $jobTranslationsEnglish->dept_impact = '';
                $jobTranslationsEnglish->team_impact = '';
                $jobTranslationsEnglish->hire_impact = '';
                $jobTranslationsEnglish->division = '';
                $jobTranslationsEnglish->education = '';
                $jobTranslationsEnglish->work_env_description = '';
                $jobTranslationsEnglish->culture_summary = '';
                $jobTranslationsEnglish->culture_special = '';
            }

            $jobTranslationsFrench = DB::table('job_poster_translations')->where('job_poster_id', $job->id)->where('locale', 'fr')->first();

            if ($jobTranslationsFrench === null) {
                $jobTranslationsFrench = new stdClass();
                $jobTranslationsFrench->locale = 'fr';
                $jobTranslationsFrench->city = '';
                $jobTranslationsFrench->title = '';
                $jobTranslationsFrench->dept_impact = '';
                $jobTranslationsFrench->team_impact = '';
                $jobTranslationsFrench->hire_impact = '';
                $jobTranslationsFrench->division = '';
                $jobTranslationsFrench->education = '';
                $jobTranslationsFrench->work_env_description = '';
                $jobTranslationsFrench->culture_summary = '';
                $jobTranslationsFrench->culture_special = '';
            }

            $job->city = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->city, $jobTranslationsFrench->locale => $jobTranslationsFrench->city])->toJson();

            $job->title = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->title, $jobTranslationsFrench->locale => $jobTranslationsFrench->title])->toJson();

            $job->dept_impact = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->dept_impact, $jobTranslationsFrench->locale => $jobTranslationsFrench->dept_impact])->toJson();

            $job->team_impact = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->team_impact, $jobTranslationsFrench->locale => $jobTranslationsFrench->team_impact])->toJson();

            $job->hire_impact = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->hire_impact, $jobTranslationsFrench->locale => $jobTranslationsFrench->hire_impact])->toJson();

            $job->division = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->division, $jobTranslationsFrench->locale => $jobTranslationsFrench->division])->toJson();

            $job->education = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->education, $jobTranslationsFrench->locale => $jobTranslationsFrench->education])->toJson();

            $job->work_env_description = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->work_env_description, $jobTranslationsFrench->locale => $jobTranslationsFrench->work_env_description])->toJson();

            $job->culture_summary = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->culture_summary, $jobTranslationsFrench->locale => $jobTranslationsFrench->culture_summary])->toJson();

            $job->culture_special = collect([$jobTranslationsEnglish->locale => $jobTranslationsEnglish->culture_special, $jobTranslationsFrench->locale => $jobTranslationsFrench->culture_special])->toJson();

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
