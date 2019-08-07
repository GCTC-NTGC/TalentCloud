<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\JobPoster;
use App\Models\Manager;
use App\Models\User;
use Illuminate\Support\Facades\Config;
use App\Models\Classification;

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
     * @param  integer $managerId Manager ID to associate with the Job Poster.
     * @param  boolean $published Whether this Job is published.
     * @return string[]
     */
    private function generateFrontendJob(int $managerId): array
    {
        $dateFormat = Config::get('app.api_datetime_format');
        $job = [
            'term_qty' => $this->faker->numberBetween(1, 4),
            'salary_min' => $this->faker->numberBetween(60000, 80000),
            'salary_max' => $this->faker->numberBetween(80000, 100000),
            'noc' => $this->faker->numberBetween(1, 9999),
            'classification_code' => Classification::inRandomOrder()->first()->key,
            'classification_level' => $this->faker->numberBetween(1, 6),
            'manager_id' => $managerId,
            'remote_work_allowed' => $this->faker->boolean(50),
            'open_date_time' => $this->faker->date($dateFormat, strtotime('+1 day')),
            'close_date_time' => $this->faker->date($dateFormat, strtotime('+2 weeks')),
            'start_date_time' => $this->faker->date($dateFormat, '+2 weeks'),
            'security_clearance_id' => 1,
            'language_requirement_id' => 1,
            'department_id' => 1,
            'province_id' => 1,
            'team_size' => $this->faker->numberBetween(5, 30),
            'work_env_features' => [
                'env_open_concept' => true,
                'env_windows' => true,
                'amenities_near_transit' => false,
            ],
            'fast_vs_steady' => $this->faker->numberBetween(1, 4),
            'horizontal_vs_vertical' => $this->faker->numberBetween(1, 4),
            'experimental_vs_ongoing' => $this->faker->numberBetween(1, 4),
            'citizen_facing_vs_back_office' => $this->faker->numberBetween(1, 4),
            'collaborative_vs_independent' => $this->faker->numberBetween(1, 4),
            'telework_allowed_frequency_id' => $this->faker->numberBetween(1, 4),
            'flexible_hours_frequency_id' => $this->faker->numberBetween(1, 4),
            'en' => [
                'city' => $this->faker->city(),
                'title' => $this->faker->word(),
                'dept_impact' => $this->faker->paragraph(),
                'team_impact' => $this->faker->paragraph(),
                'hire_impact' => $this->faker->paragraph(),
                'branch' => $this->faker->word(),
                'division' => $this->faker->word(),
                'education' => $this->faker->word(),
                'work_env_description' => $this->faker->paragraph(),
                'culture_summary' => $this->faker->paragraph(),
                'culture_special' => $this->faker->paragraph(),
            ],
            'fr' => [
                'city' => $this->faker->city(),
                'title' => $this->faker->word(),
                'dept_impact' => $this->faker->paragraph(),
                'team_impact' => $this->faker->paragraph(),
                'hire_impact' => $this->faker->paragraph(),
                'branch' => $this->faker->word(),
                'division' => $this->faker->word(),
                'education' => $this->faker->word(),
                'work_env_description' => $this->faker->paragraph(),
                'culture_summary' => $this->faker->paragraph(),
                'culture_special' => $this->faker->paragraph(),
            ],
        ];
        return $job;
    }

    /**
     * A guest user should be able to retreive a published job.
     *
     * @return void
     */
    public function testGetAsPublic(): void
    {
        $job = factory(JobPoster::class)->state('published')->create();
        $response = $this->json('get', "api/jobs/$job->id");
        $response->assertOk();
        $expected = $job->toApiArray();
        $response->assertJson($expected);
    }

    /**
     * When logged in as a job's manager, updating the job should be successful.
     *
     * @return void
     */
    public function testUpdateAsManager(): void
    {
        $job = factory(JobPoster::class)->create();
        $jobUpdate = $this->generateFrontendJob($job->manager_id, false);
        $response = $this->followingRedirects()
            ->actingAs($job->manager->user)
            ->json('put', "api/jobs/$job->id", $jobUpdate);
        $response->assertOk();
        $expectedDb = array_merge(
            collect($jobUpdate)->except(['en', 'fr', 'work_env_features', 'classification_code'])->toArray(),
            [
                'id' => $job->id,
                'manager_id' => $job->manager_id,
                'classification_id' => Classification::where('key', $jobUpdate['classification_code'])->first()->id
            ]
        );
        $this->assertDatabaseHas('job_posters', $expectedDb);
        $newJob = $job->fresh();
        // json columns don't seem to work with normal assertDatabaseHas
        $this->assertEquals($jobUpdate['work_env_features'], $newJob->work_env_features);
        $translations = $newJob->getTranslationsArray();
        $this->assertArraySubset($jobUpdate['en'], $translations['en']);
        $this->assertArraySubset($jobUpdate['fr'], $translations['fr']);
    }

    /**
     * When logged in as a manager that did not create a particular job,
     * updating that job should fail.
     *
     * @return void
     */
    public function testUpdateAsWrongManager(): void
    {
        $job = factory(JobPoster::class)->create();
        $otherManager = factory(User::class)->state('manager')->create();
        $jobUpdate = $this->generateFrontendJob($job->manager_id, false);
        $response = $this->actingAs($otherManager)
        ->json('put', "api/jobs/$job->id", $jobUpdate);
        $response->assertForbidden();
    }

    /**
     * Even when logged in as the correct manager, updating a job with illegal values
     * (eg string where a number should be) should fail.
     *
     * @return void
     */
    public function testUpdateInvalidInput(): void
    {
        $job = factory(JobPoster::class)->create();
        $jobUpdate = $this->generateFrontendJob($job->manager_id, false);
        $jobUpdate['term_qty'] = 'three months'; // String is invalid here.
        $response = $this->actingAs($job->manager->user)
            ->json('put', "api/jobs/$job->id", $jobUpdate);
        $response->assertStatus(422);
    }

    /**
     * Even when logged in as the correct manager, updating a job with illegal values
     * (eg string where a number should be) should fail.
     *
     * @return void
     */
    public function testUpdateWithInvalidWorkEnvFeatures(): void
    {
        $job = factory(JobPoster::class)->create();
        $jobUpdate = $this->generateFrontendJob($job->manager_id, false);
        $jobUpdate['work_env_features'] = [
                'env_open_concept' => true,
                'env_windows' => true,
                'amenities_near_transit' => false,
                'invalid_feature' => 'hello world'
        ];
        $response = $this->actingAs($job->manager->user)
            ->json('put', "api/jobs/$job->id", $jobUpdate);
        $response->assertStatus(422);
    }

    /**
     * Even while job.published is 'fillable', it shouldn't be
     * possible to modify published or published_at through an update request.
     *
     * @return void
     */
    public function testCannotUpdatePublished(): void
    {
        $job = factory(JobPoster::class)->state('draft')->create();
        $jobUpdate = $this->generateFrontendJob($job->manager_id, false);
        $jobUpdate['published'] = true;
        $response = $this->followingRedirects()
            ->actingAs($job->manager->user)
            ->json('put', "api/jobs/$job->id", $jobUpdate);
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
            ->json('post', 'api/jobs');
        $this->assertAuthenticatedAs($manager->user);
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
            ->json('post', 'api/jobs');
        $response->assertForbidden();
    }
}
