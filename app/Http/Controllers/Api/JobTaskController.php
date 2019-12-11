<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BatchUpdateJobTask;
use App\Models\JobPoster;
use App\Models\JobPosterKeyTask;

class JobTaskController extends Controller
{
    /**
     * Converts a JobPosterKeyTask to an array appropriate for the api.
     *
     * @param  JobPosterKeyTask $model Incoming Job Poster Key Task object.
     * @return array
     */
    public function toApiArray(JobPosterKeyTask $model)
    {
        return array_merge($model->toArray(), $model->getTranslations());
    }

    public function indexByJob(JobPoster $jobPoster)
    {
        $toApiArray = array ($this, 'toApiArray');
        $taskArray = JobPosterKeyTask::where('job_poster_id', $jobPoster->id)->get()->map($toApiArray);
        return response()->json($taskArray);
    }

    /**
     * Update the set of tasks associated with a Job.
     *
     * @param  \App\Http\Requests\BatchUpdateJobTask $request   Incoming form request.
     * @param  \App\Models\JobPoster                 $jobPoster Incoming Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function batchUpdate(BatchUpdateJobTask $request, JobPoster $jobPoster)
    {
        $toApiArray = array ($this, 'toApiArray');

        $newTasks = collect($request->validated()); // Collection of JobPosterKeyTasks.
        $oldTasks = $jobPoster->job_poster_key_tasks;

        $savedNewTaskIds = [];

        // First, delete old tasks that weren't resubmitted, and update those that were.
        foreach ($oldTasks as $task) {
            $newTask = $newTasks->firstWhere('id', $task['id']);
            if ($newTask) {
                $savedNewTaskIds[] = $newTask['id'];
                $task->fill(collect($newTask)->toArray());
                $task->save();
            } else {
                $task->delete();
            }
        }

        // Now, save any new tasks that remain.
        foreach ($newTasks as $task) {
            if ($this->isUnsaved($task, $savedNewTaskIds)) {
                $jobPosterTask = new JobPosterKeyTask();
                $jobPosterTask->job_poster_id = $jobPoster->id;
                $jobPosterTask->fill(collect($task)->toArray());
                $jobPosterTask->save();
            }
        }

        $taskArray = $jobPoster->fresh()->job_poster_key_tasks->map($toApiArray);
        return response()->json($taskArray);
    }

    /**
     * Helper function to determine whether a task is unsaved.
     *
     * @param mixed    $task         Single collection item from new tasks array.
     * @param number[] $savedTaskIds Array of saved task IDs.
     * @return boolean
     */
    private function isUnsaved($task, array $savedTaskIds): bool
    {
        return !array_key_exists('id', $task) || !in_array($task['id'], $savedTaskIds);
    }
}
