<?php

namespace App\Http\Controllers\Api;

use App\Models\JobPosterKeyTask;
use App\Models\JobPoster;
use App\Http\Controllers\Controller;
use App\Http\Requests\BatchUpdateJobTask;

class JobTaskController extends Controller
{
    /**
     * Converts a JobPosterKeyTask to an array appropriate for the api.
     *
     * @param JobPosterKeyTask $model
     * @return void
     */
    public function toApiArray(JobPosterKeyTask $model)
    {
        return array_merge($model->toArray(), $model->getTranslationsArray());
    }

    public function indexByJob(JobPoster $jobPoster)
    {
        $toApiArray = array($this, 'toApiArray');
        $taskArray = JobPosterKeyTask::where('job_poster_id', $jobPoster->id)->get()->map($toApiArray);
        return response()->json($taskArray);
    }

    /**
     * Update the set of tasks associated with a Job.
     *
     * @param  App\Http\Requests\BatchUpdateJobTask  $request
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function batchUpdate(BatchUpdateJobTask $request, JobPoster $jobPoster)
    {
        $toApiArray = array($this, 'toApiArray');

        $newTasks = collect($request->validated()); // Collection of JobPosterKeyTasks
        $oldTasks = $jobPoster->job_poster_key_tasks;

        $savedNewTaskIds = [];

        // First, delete old tasks that weren't resubmitted, and update those that were
        foreach ($oldTasks as $task) {
            $newTask = $newTasks->firstWhere('id', $task['id']);
            if ($newTask) {
                $savedNewTaskIds[] = $newTask['id'];
                $task->fill(collect($newTask)->only(['en', 'fr'])->toArray());
                $task->save();
            } else {
                $task->delete();
            }
        }

        $isUnsaved = function ($task, $savedTaskIds): bool {
            return !array_key_exists('id', $task) || !in_array($task['id'], $savedTaskIds);
        };

        // Now, save any new tasks that remain
        foreach ($newTasks as $task) {
            if ($isUnsaved($task, $savedNewTaskIds)) {
                $jobPosterTask = new JobPosterKeyTask();
                $jobPosterTask->job_poster_id = $jobPoster->id;
                $jobPosterTask->fill(collect($task)->only(['en', 'fr'])->toArray());
                $jobPosterTask->save();
            }
        }

        $taskArray = $jobPoster->fresh()->job_poster_key_tasks->map($toApiArray);
        return response()->json($taskArray);
    }
}
