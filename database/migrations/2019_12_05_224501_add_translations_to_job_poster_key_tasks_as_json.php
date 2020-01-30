<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTranslationsToJobPosterKeyTasksAsJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('job_poster_key_tasks', function (Blueprint $table) {
            $table->json('description')->nullable();
        });

        $tasks = DB::table('job_poster_key_tasks')->get();

        foreach ($tasks as $task) {
            $taskTranslationsEnglish = DB::table('job_poster_key_task_translations')->where('job_poster_key_task_id', $task->id)->where('locale', 'en')->first();
            $taskTranslationsFrench = DB::table('job_poster_key_task_translations')->where('job_poster_key_task_id', $task->id)->where('locale', 'fr')->first();

            $task->description = collect([$taskTranslationsEnglish->locale => $taskTranslationsEnglish->value, $taskTranslationsFrench->locale => $taskTranslationsFrench->value])->toJson();

            DB::table('job_poster_key_tasks')->where('id', $task->id)->update([
                'id' => $task->id,
                'description' => $task->description
            ]);
        }

        Schema::drop('job_poster_key_task_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('job_poster_key_tasks', function (Blueprint $table) {
            $table->dropColumn('description');
        });
    }
}
