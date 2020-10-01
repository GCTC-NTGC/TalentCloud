<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BatchUpdateJobTask;
use App\Models\JobPoster;
use App\Models\JobPosterKeyTask;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class JobPosterKeyTaskController extends Controller
{
    /**
     * Returns all Tasks by JobPoster ID.
     *
     * @param  \App\Models\JobPoster $jobPoster Incoming Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function indexByJob(JobPoster $jobPoster)
    {
        $tasksByJob = JobPosterKeyTask::where('job_poster_id', $jobPoster->id)->orderBy('order', 'asc')->get();
        return JsonResource::collection($tasksByJob);
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
        $order = 1;
        // Collection of JobPosterKeyTasks. Update the
        // order here so the frontend doesn't have to worry about it.
        $newTasks = $request->validated();
        foreach ($newTasks as &$singleTask) {
            $singleTask['order'] = $order;
            $order++;
        }
        $newTasks = collect($newTasks);
        $oldTasks = $jobPoster->job_poster_key_tasks;

        $savedNewTaskIds = [];

        // First, delete old tasks that weren't resubmitted, and update those that were.
        foreach ($oldTasks as $task) {
            $newTask = $newTasks->firstWhere('id', $task['id']);
            if ($newTask) {
                $savedNewTaskIds[] = $newTask['id'];
                $task->fill($newTask);
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
                $jobPosterTask->fill($task);
                $jobPosterTask->save();
            }
        }

        return JsonResource::collection($jobPoster->fresh()->job_poster_key_tasks);
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
