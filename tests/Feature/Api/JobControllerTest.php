<?php

namespace Tests\Feature\Api;

use App\Models\Classification;
use App\Models\JobPoster;

use App\Models\Manager;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use App\Models\HrAdvisor;
use Tests\TestCase;

class JobControllerTest extends TestCase
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

    protected function jobToArray(JobPoster $job)
    {
        // $criteria = $job->criteria;
        // $toApiArray = function ($model) {
        // return array_merge($model->toArray(), $model->getTranslations());
        // };
        // $criteriaTranslated = $criteria->map($toApiArray);
        $jobArray = array_merge($job->toArray(), [
            'criteria' => $job->criteria->map->toArray(),
            'manager' => $job->manager->toArray()
        ]);
        return $job->toArray();
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
            'chosen_lang' => $this->faker->randomElement(['en', 'fr']),
            'term_qty' => $this->faker->numberBetween(1, 4),
            'salary_min' => $this->faker->numberBetween(60000, 80000),
            'salary_max' => $this->faker->numberBetween(80000, 100000),
            'noc' => $this->faker->numberBetween(1, 9999),
            'classification_id' => 1,
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
            'travel_requirement_id' => $this->faker->numberBetween(1, 3),
            'overtime_requirement_id' => $this->faker->numberBetween(1, 3),
            'en' => [
                'city' => $this->faker->city(),
                'title' => $this->faker->word(),
                'dept_impact' => $this->faker->paragraph(),
                'team_impact' => $this->faker->paragraph(),
                'hire_impact' => $this->faker->paragraph(),
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
     * A guest user should be able to retrieve a published job.
     *
     * @return void
     */
    public function testGetAsPublic(): void
    {
        $job = factory(JobPoster::class)->state('published')->create();
        $response = $this->json('get', "api/jobs/$job->id");
        $response->assertOk();
        $expected = array_merge($job->toArray(), $job->getTranslations());
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
            collect($jobUpdate)->except(['en', 'fr', 'work_env_features'])->toArray(),
            [
                'id' => $job->id,
                'manager_id' => $job->manager_id,
            ]
        );
        $this->assertDatabaseHas('job_posters', $expectedDb);
        $newJob = $job->fresh();
        // json columns don't seem to work with normal assertDatabaseHas
        $this->assertEquals($jobUpdate['work_env_features'], $newJob->work_env_features);
        $response->assertJsonFragment($newJob->getTranslations());
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
        $otherManager = factory(User::class)->state('upgradedManager')->create();
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
            'openConcept' => true,
            'windows' => true,
            'downtown' => false,
            'invalid_feature' => 'hello world'
        ];
        $response = $this->actingAs($job->manager->user)
            ->json('put', "api/jobs/$job->id", $jobUpdate);
        $response->assertStatus(422);
    }

    /**
     * Even while job.job_poster_status_id is 'fillable', it shouldn't be
     * possible to modify job_poster_status_id through an update request.
     *
     * @return void
     */
    public function testCannotUpdateJobPosterStatus(): void
    {
        $job = factory(JobPoster::class)->state('draft')->create();
        $jobUpdate = $this->generateFrontendJob($job->manager_id, false);
        $jobUpdate['job_poster_status_id'] = $job->job_poster_status_id + 1;
        $response = $this->followingRedirects()
            ->actingAs($job->manager->user)
            ->json('put', "api/jobs/$job->id", $jobUpdate);
        $response->assertOk();
        $newJob = $job->fresh();
        $this->assertEquals($job->job_poster_status_id, $newJob->job_poster_status_id);
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

    public function testReturnsCorrectClassification(): void
    {
        $classification = Classification::inRandomOrder()->first();
        $job = factory(JobPoster::class)->state('published')->create([
            'classification_id' => $classification->id
        ]);
        $response = $this->json('get', "api/jobs/$job->id");
        $response->assertOk();
        $response->assertJsonFragment(['classification_id' => $classification->id]);
    }

    /**
     * Tests the job index response for all user roles except Hr Advisor
     *
     * @return void
     */
    public function testIndex(): void
    {
        $demoJob = factory(JobPoster::class)->states(['draft', 'byDemoManager'])->create();
        $otherDemoJob = factory(JobPoster::class)->states(['draft', 'byDemoManager'])->create();
        $draftJob = factory(JobPoster::class)->states(['draft', 'byUpgradedManager'])->create();
        $reviewJob = factory(JobPoster::class)->states(['review_requested', 'byUpgradedManager'])->create();
        $openJob = factory(JobPoster::class)->states(['published', 'byUpgradedManager'])->create();
        $closedJob = factory(JobPoster::class)->states(['closed', 'byUpgradedManager'])->create();

        $demoJson = $this->jobToArray($demoJob);
        $draftJson = $this->jobToArray($draftJob);
        $reviewJson = $this->jobToArray($reviewJob);
        $openJson = $this->jobToArray($openJob);
        $closedJson = $this->jobToArray($closedJob);

        // A guest recieves open and closed jobs
        $guestResponse = $this->json('get', route('api.jobs.index'));
        $guestResponse->assertJsonCount(2);
        $guestResponse->assertJsonFragment($openJson);
        $guestResponse->assertJsonFragment($closedJson);

        // An demo manager (ie applicant) can see open/closed jobs, and its own demo jobs
        $applicantResponse = $this->actingAs($demoJob->manager->user)->json('get', route('api.jobs.index'));
        $applicantResponse->assertJsonCount(3);
        $applicantResponse->assertJsonFragment($demoJson);
        $applicantResponse->assertJsonFragment($openJson);
        $applicantResponse->assertJsonFragment($closedJson);

        // A manager can view its own draft job, and open/closed jobs
        $draftManagerResponse = $this->actingAs($draftJob->manager->user)->json('get', route('api.jobs.index'));
        $draftManagerResponse->assertJsonCount(3);
        $draftManagerResponse->assertJsonFragment($draftJson);
        $draftManagerResponse->assertJsonFragment($openJson);
        $draftManagerResponse->assertJsonFragment($closedJson);

        // A manager can also view its on job in review
        $reviewManagerResponse = $this->actingAs($reviewJob->manager->user)->json('get', route('api.jobs.index'));
        $reviewManagerResponse->assertJsonCount(3);
        $reviewManagerResponse->assertJsonFragment($reviewJson);
        $reviewManagerResponse->assertJsonFragment($openJson);
        $reviewManagerResponse->assertJsonFragment($closedJson);

        // An admin can view all jobs
        $adminUser = factory(User::class)->state('admin')->create();
        $adminResponse = $this->actingAs($adminUser)->json('get', route('api.jobs.index'));
        $adminResponse->assertJsonCount(6);
    }

    public function testIndexForHr()
    {
        // An HR manager can view open/closed jobs, and in-review (but not draft) jobs in its own department
        $deptId = 1;
        $otherDeptId = 2;
        $hrAdvisor = factory(HrAdvisor::class)->create([
            'department_id' => $deptId,
        ]);
        $managerInDept = factory(Manager::class)->state('upgraded')->create([
            'department_id' => $deptId,
        ]);
        $managerOtherDept = factory(Manager::class)->state('upgraded')->create([
            'department_id' => $otherDeptId,
        ]);

        $draftInDept = factory(JobPoster::class)->state('draft')->create([
            'department_id' => $deptId,
            'manager_id' => $managerInDept->id,
        ]);
        $draftOtherDept = factory(JobPoster::class)->state('draft')->create([
            'department_id' => $otherDeptId,
            'manager_id' => $managerOtherDept->id,
        ]);

        $reviewInDept = factory(JobPoster::class)->state('review_requested')->create([
            'department_id' => $deptId,
            'manager_id' => $managerInDept->id,
        ]);
        $reviewOtherDept = factory(JobPoster::class)->state('review_requested')->create([
            'department_id' => $otherDeptId,
            'manager_id' => $managerOtherDept->id,
        ]);

        $openJob = factory(JobPoster::class)->states(['published', 'byUpgradedManager'])->create();
        $closedJob = factory(JobPoster::class)->states(['closed', 'byUpgradedManager'])->create();

        $hrResponse = $this->actingAs($hrAdvisor->user)->json('get', route('api.jobs.index'));

        $hrResponse->assertJsonMissingExact($this->jobToArray($draftInDept));
        $hrResponse->assertJsonMissingExact($this->jobToArray($draftOtherDept));
        $hrResponse->assertJsonMissingExact($this->jobToArray($reviewOtherDept));
        $hrResponse->assertJsonFragment($this->jobToArray($reviewInDept));
        $hrResponse->assertJsonFragment($this->jobToArray($openJob));
        $hrResponse->assertJsonFragment($this->jobToArray($closedJob));
    }

    public function testIndexDeptFilter(): void
    {
        $deptId = 1;
        $otherDeptId = 2;
        $managerInDept = factory(Manager::class)->state('upgraded')->create([
            'department_id' => $deptId,
        ]);
        $managerOtherDept = factory(Manager::class)->state('upgraded')->create([
            'department_id' => $otherDeptId,
        ]);

        $inDept = factory(JobPoster::class)->state('published')->create([
            'department_id' => $deptId,
            'manager_id' => $managerInDept->id,
        ]);
        $otherDept = factory(JobPoster::class)->state('published')->create([
            'department_id' => $otherDeptId,
            'manager_id' => $managerOtherDept->id,
        ]);

        $response = $this->json('get', route('api.jobs.index', ['department_id' => $deptId]));
        $response->assertJsonFragment($this->jobToArray($inDept));
        $response->assertJsonMissingExact($this->jobToArray($otherDept));
    }
}
