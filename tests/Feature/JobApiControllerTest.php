<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\JobPoster;

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
        $job = [
            'term_qty' => $this->faker->numberBetween(1, 4),
            'salary_min' => $this->faker->numberBetween(60000, 80000),
            'salary_max' => $this->faker->numberBetween(80000, 100000),
            'noc' => $this->faker->numberBetween(1, 9999),
            'classification' => $this->faker->regexify('[A-Z]{2}-0[1-5]'),
            'manager_id' => $managerId,
            'published' => $published,
            'remote_work_allowed' => $this->faker->boolean(50),
            'open_date_time' => $this->faker->date( 'Y-m-d H:i:s', strtotime('+1 day')),
            'close_date_time' => $this->faker->date( 'Y-m-d H:i:s', strtotime('+2 weeks')),
            'start_date_time' => $this->faker->date( 'Y-m-d H:i:s', strtotime('+2 weeks')),
            'security_clearance_id' => 1,
            'language_requirement_id' => 1,
            'department_id' => 1,
            'province_id' => 1,
            'en' => [
                'city' => $this->faker->city,
                'title' => $this->faker->word,
                'impact' => $this->faker->paragraphs(
                    2,
                    true
                ),
                'branch' => $this->faker->word,
                'division' => $this->faker->word,
                'education' => $this->faker->word,
            ],
            'fr' => [
                'city' => $this->faker->city,
                'title' => $this->faker->word,
                'impact' => $this->faker->paragraphs(
                    2,
                    true
                ),
                'branch' => $this->faker->word,
                'division' => $this->faker->word,
                'education' => $this->faker->word,
            ],
        ];
        return $job;
    }

    public function testGetAsPublic()
    {
        $job = factory(JobPoster::class)->state('published')->create();
        $response = $this->get("api/jobs/$job->id");
        $response->assertOk();

        $expected = $job->toApiArray();

        $response->assertJson($expected);
    }

    public function testUpdateAsManager()
    {
        $job = factory(JobPoster::class)->create();
        $jobUpdate = $this->generateFrontendJob($job->manager_id, false);
        $response = $this->followingRedirects()
            ->actingAs($job->manager->user)
            ->put("api/jobs/$job->id", $jobUpdate);
        dump($response->baseResponse->exception);
        $response->assertOk();
        $expectedDb = array_merge(
            array_slice($jobUpdate, 0, 15),
            ['id' => $job->id, 'manager_id' => $job->manager_id]
        );
        $this->assertDatabaseHas('job_posters', $expectedDb);

        $newJob = $job->fresh();
        $translations = $newJob->getTranslationsArray();
        $this->assertEquals($jobUpdate['en'], $translations['en']);
        $this->assertEquals($jobUpdate['fr'], $translations['fr']);
    }

}
