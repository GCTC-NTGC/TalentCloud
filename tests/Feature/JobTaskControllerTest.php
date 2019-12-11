<?php

namespace Tests\Feature;

use App\Models\JobPoster;
use App\Models\JobPosterKeyTask;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JobTaskControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     *  Converts a JobPosterKeyTask to shape sent and received through the api.
     *
     * @var callable
     */
    protected $toApiArray;

    /**
     * Run parent setup and create helper function.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->toApiArray = function (JobPosterKeyTask $model) {
            return array_merge($model->toArray(), $model->getTranslations());
        };
    }

    public function testIndexByJob()
    {
        $job = factory(JobPoster::class)->state('published')->create();
        // Ensure the factory added tasks, so we're not just checking an empty array.
        $this->assertNotEmpty($job->job_poster_key_tasks);

        $expected = $job->job_poster_key_tasks->map($this->toApiArray)->toArray();
        $response = $this->json('get', "api/jobs/$job->id/tasks");
        $response->assertOk();
        $response->assertJson($expected);
    }

    public function testBatchUpdateAddsTasks()
    {
        $job = factory(JobPoster::class)->create();

        $newTasks = factory(JobPosterKeyTask::class, 3)->make(['job_poster_id' => $job->id, 'id' => null]);
        $newTaskArray = collect($newTasks)->map($this->toApiArray);
        $response = $this->actingAs($job->manager->user)
            ->json('put', "api/jobs/$job->id/tasks", $newTaskArray->toArray());
        $response->assertOk();

        foreach ($newTasks as $task) {
            $this->assertDatabaseHas(
                'job_poster_key_tasks',
                [
                    'description->en' => $task->getTranslation('description', 'en'),
                    'description->fr' => $task->getTranslation('description', 'fr')
                ]
            );
        }
    }

    public function testBatchUpdateRemovesTasks()
    {
        $job = factory(JobPoster::class)->create();
        $job->job_poster_key_tasks()->delete(); // Clear tasks, to start from clean slate.

        $tasks = factory(JobPosterKeyTask::class, 2)->create(['job_poster_id' => $job->id]);
        $task0 = $tasks[0];
        $task1 = $tasks[1];
        // A new task, not yet saved to database.
        $task2 = factory(JobPosterKeyTask::class)->make(['job_poster_id' => $job->id, 'id' => null]);

        $newTaskArray = collect([$task1, $task2])->map($this->toApiArray); // The updated tasks don't include task0.
        $response = $this->actingAs($job->manager->user)
            ->json('put', "api/jobs/$job->id/tasks", $newTaskArray->toArray());
        $response->assertOk();

        // Task1 should be present, unchanged.
        $this->assertTrue($task1->is(JobPosterKeyTask::find($task1->id)));
        $this->assertDatabaseHas(
            'job_poster_key_tasks',
            [
                'description->en' => $task1->getTranslation('description', 'en'),
                'description->fr' => $task1->getTranslation('description', 'fr')
            ]
        );

        // Task0 should be deleted.
        $this->assertNull(JobPosterKeyTask::find($task0->id));
        $this->assertDatabaseMissing(
            'job_poster_key_tasks',
            [
                'description->en' => $task0->getTranslation('description', 'en'),
                'description->fr' => $task0->getTranslation('description', 'fr')
            ]
        );
    }

    public function testBatchUpdateUpdatesTasks()
    {
        $job = factory(JobPoster::class)->create();
        $job->job_poster_key_tasks()->delete(); // Clear tasks, to start from clean slate.

        $task0 = factory(JobPosterKeyTask::class)->create(['job_poster_id' => $job->id]);

        $enDescription = 'This is new description text';
        $frDescription = null;
        $newTaskArray = [
            [
                'id' => $task0->id,
                'job_poster_id' => $job->id,
                'description' => [
                    'en' => $enDescription,
                    'fr' => $frDescription
                ]
            ]
        ];
        $response = $this->actingAs($job->manager->user)
            ->json('put', "api/jobs/$job->id/tasks", $newTaskArray);
        $response->assertOk();

        // Task1 should be present, but with updated description.
        $this->assertNotNull(JobPosterKeyTask::find($task0->id));
        $this->assertDatabaseHas(
            'job_poster_key_tasks',
            [
                'id' => $task0->id,
                'description->en' => $enDescription,
                'description->fr' => $frDescription
            ]
        );
    }

    public function testBatchUpdateAddsTasksWithEmptyOrStringIds()
    {
        $job = factory(JobPoster::class)->create();
        $job->job_poster_key_tasks()->delete(); // Clear tasks, to start from clean slate.

        $task0 = [
            'id' => null,
            'job_poster_id' => $job->id,
            'description' => [
                'en' => 'Description 0',
                'fr' => 'FR Description 0'
            ]
        ];
        $task1 = [
            'id' => 'temp-1',
            'job_poster_id' => $job->id,
            'description' => [
                'en' => 'Description 1',
                'fr' => 'FR Description 1'
            ]
        ];

        $newTaskArray = [$task0, $task1];

        $response = $this->actingAs($job->manager->user)
            ->json('put', "api/jobs/$job->id/tasks", $newTaskArray);
        $response->assertOk();

        foreach ($newTaskArray as $task) {
            $this->assertDatabaseHas(
                'job_poster_key_tasks',
                [
                    'job_poster_id' => $job->id,
                    'description->en' => $task['description']['en'],
                    'description->fr' => $task['description']['fr'],
                ]
            );
        }
    }
}
