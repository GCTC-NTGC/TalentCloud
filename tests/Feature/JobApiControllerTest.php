<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\JobPoster;
use App\Models\User;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Capsule\Manager;

class JobApiControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Run parent setup and provide reusable factories.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->faker = \Faker\Factory::create();
    }

    /**
     * Generate an array with all the data that would be submitted through a completed edit/create job form.
     *
     * @return array
     */
    private function generateFrontendJob($managerId, $published = false): array
    {
        $dateFormat = Config::get('app.api_datetime_format');
        $job = [
            'term_qty' => $this->faker->numberBetween(1, 4),
            'salary_min' => $this->faker->numberBetween(60000, 80000),
            'salary_max' => $this->faker->numberBetween(80000, 100000),
            'noc' => $this->faker->numberBetween(1, 9999),
            'classification_code' => $this->faker->regexify('[A-Z]{2}'),
            'classification_level' => $this->faker->numberBetween(1, 6),
            'manager_id' => $managerId,
            'published' => $published,
            'remote_work_allowed' => $this->faker->boolean(50),
            'open_date_time' => $this->faker->date($dateFormat, strtotime('+1 day')),
            'close_date_time' => $this->faker->date($dateFormat, strtotime('+2 weeks')),
            'start_date_time' => $this->faker->date($dateFormat, '+2 weeks'),
            'security_clearance_id' => 1,
            'language_requirement_id' => 1,
            'department_id' => 1,
            'province_id' => 1,
            'en' => [
                'city' => $this->faker->city(),
                'title' => $this->faker->word(),
                'team_impact' => $this->faker->paragraph(),
                'hire_impact' => $this->faker->paragraph(),
                'branch' => $this->faker->word(),
                'division' => $this->faker->word(),
                'education' => $this->faker->word(),
            ],
            'fr' => [
                'city' => $this->faker->city(),
                'title' => $this->faker->word(),
                'team_impact' => $this->faker->paragraph(),
                'hire_impact' => $this->faker->paragraph(),
                'branch' => $this->faker->word(),
                'division' => $this->faker->word(),
                'education' => $this->faker->word(),
            ],
        ];
        return $job;
    }

    public function testGetAsPublic(): void
    {
        $job = factory(JobPoster::class)->state('published')->create();
        $response = $this->json("get", "api/jobs/$job->id");
        $response->assertOk();

        $expected = $job->toApiArray();

        $response->assertJson($expected);
    }

    public function testUpdateAsManager(): void
    {
        $job = factory(JobPoster::class)->create();
        $jobUpdate = $this->generateFrontendJob($job->manager_id, false);
        $response = $this->followingRedirects()
            ->actingAs($job->manager->user)
            ->json("put", "api/jobs/$job->id", $jobUpdate);
        $response->assertOk();
        $expectedDb = array_merge(
            array_slice($jobUpdate, 0, 15),
            ['id' => $job->id, 'manager_id' => $job->manager_id]
        );
        $this->assertDatabaseHas('job_posters', $expectedDb);

        $newJob = $job->fresh();
        $translations = $newJob->getTranslationsArray();
        $this->assertArraySubset($jobUpdate['en'], $translations['en']);
        $this->assertArraySubset($jobUpdate['fr'], $translations['fr']);
    }

    public function testUpdateAsWrongManager(): void
    {
        $job = factory(JobPoster::class)->create();
        $otherManager = factory(User::class)->state('manager')->create();
        $jobUpdate = $this->generateFrontendJob($job->manager_id, false);
        $response = $this->actingAs($otherManager)
            ->json("put", "api/jobs/$job->id", $jobUpdate);
        $response->assertForbidden();
    }

    public function testUpdateInvalidInput(): void
    {
        $job = factory(JobPoster::class)->create();
        $jobUpdate = $this->generateFrontendJob($job->manager_id, false);
        $jobUpdate['term_qty'] = "three months"; // String is invalid here
        $response = $this->actingAs($job->manager->user)
            ->json("put", "api/jobs/$job->id", $jobUpdate);
        $response->assertStatus(422);
    }

    /**
     * Even while job.published is 'fillable', it shouldn't be
     * possible to modify published or published_at through an update request.
     */
    public function testCannotUpdatePublished(): void
    {
        $job = factory(JobPoster::class)->state('draft')->create();
        $jobUpdate = $this->generateFrontendJob($job->manager_id, false);
        $jobUpdate['published'] = true;
        $response = $this->followingRedirects()
            ->actingAs($job->manager->user)
            ->json("put", "api/jobs/$job->id", $jobUpdate);
        $response->assertOk();
        $newJob = $job->fresh();
        $this->assertFalse($newJob->published);
        $this->assertNull($newJob->published_at);
    }

    /**
     * Manager should be able to create an empty job
     *
     * @return void
     */
    public function testManagerCanStoreEmptyJob(): void
    {
        $manager = factory(Manager::class)->create();
        $response = $this->followingRedirects()
            ->actingAs($manager->user)
            ->json('post', 'api/jobs', []);
        $response->assertOk();
        $this->assertDatabaseHas('job_posters', ['manager_id' => $manager->id]);
    }

    /**
     * Even an admin cannot store a job like this, if they're not also a manager
     *
     * @return void
     */
    public function testStoreRequiresManagerId(): void
    {
        $user = factory(User::class)->state('admin')->create();
        $response = $this->followingRedirects()
            ->actingAs($user)
            ->json('post', 'api/jobs', []);
        $response->assertForbidden();
    }
}
