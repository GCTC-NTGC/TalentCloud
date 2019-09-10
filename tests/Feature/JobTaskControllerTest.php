<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\JobPoster;
use App\Models\JobPosterKeyTask;

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
            return array_merge($model->toArray(), $model->getTranslationsArray());
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

        foreach ($newTaskArray as $task) {
            $this->assertDatabaseHas(
                'job_poster_key_task_translations',
                [
                    'locale' => 'en',
                    'description' => $task['en']['description'],
                ]
            );
            $this->assertDatabaseHas(
                'job_poster_key_task_translations',
                [
                    'locale' => 'fr',
                    'description' => $task['fr']['description'],
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
            'job_poster_key_task_translations',
            ['locale' => 'en', 'description' => $task1->translate('en')->description]
        );
        $this->assertDatabaseHas(
            'job_poster_key_task_translations',
            ['locale' => 'fr', 'description' => $task1->translate('fr')->description]
        );

        // Task0 should be deleted.
        $this->assertNull(JobPosterKeyTask::find($task0->id));
        $this->assertDatabaseMissing(
            'job_poster_key_task_translations',
            ['locale' => 'en', 'description' => $task0->translate('en')->description]
        );
        $this->assertDatabaseMissing(
            'job_poster_key_task_translations',
            ['locale' => 'fr', 'description' => $task0->translate('fr')->description]
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
                'en' => ['description' => $enDescription],
                'fr' => ['description' => $frDescription],
            ],
        ];
        $response = $this->actingAs($job->manager->user)
            ->json('put', "api/jobs/$job->id/tasks", $newTaskArray);
        $response->assertOk();

        // Task1 should be present, but with updated description.
        $this->assertNotNull(JobPosterKeyTask::find($task0->id));
        $this->assertDatabaseHas(
            'job_poster_key_task_translations',
            [
                'job_poster_key_task_id' => $task0->id,
                'locale' => 'en',
                'description' => $enDescription,
            ]
        );
        $this->assertDatabaseHas(
            'job_poster_key_task_translations',
            [
                'job_poster_key_task_id' => $task0->id,
                'locale' => 'fr',
                'description' => $frDescription,
            ]
        );
    }

    public function testBatchUpdateAddsTasksWithEmptyOrStringIds()
    {
        $job = factory(JobPoster::class)->create();
        $job->job_poster_key_tasks()->delete(); // Clear tasks, to start from clean slate.

        $task0 = [
            'id' => null,
            'en' => ['description' => 'Description 0'],
            'fr' => ['description' => 'FR Description 0'],
        ];
        $task1 = [
            'id' => 'temp-1',
            'en' => ['description' => 'Description 1'],
            'fr' => ['description' => 'FR Description 1'],
        ];


        $newTaskArray = [$task0, $task1];
        $response = $this->actingAs($job->manager->user)
            ->json('put', "api/jobs/$job->id/tasks", $newTaskArray);
        $response->assertOk();

        // Task0 and Task1 should both be added.
        $this->assertDatabaseHas(
            'job_poster_key_task_translations',
            [
                'locale' => 'en',
                'description' => $task0['en']['description'],
            ]
        );
        $this->assertDatabaseHas(
            'job_poster_key_task_translations',
            [
                'locale' => 'fr',
                'description' => $task0['fr']['description'],
            ]
        );
        $this->assertDatabaseHas(
            'job_poster_key_task_translations',
            [
                'locale' => 'en',
                'description' => $task1['en']['description'],
            ]
        );
        $this->assertDatabaseHas(
            'job_poster_key_task_translations',
            [
                'locale' => 'fr',
                'description' => $task1['fr']['description'],
            ]
        );
    }
}
