<?php

namespace Tests\Feature\Api;

use App\Models\Applicant;
use App\Models\ExperienceAward;
use App\Models\ExperienceCommunity;
use App\Models\ExperienceEducation;
use App\Models\ExperiencePersonal;
use App\Models\ExperienceWork;
use App\Http\Resources\Experience as ExperienceResource;
use App\Models\JobApplication;
use App\Models\Lookup\EducationType;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ExperienceControllerTest extends TestCase
{
    use RefreshDatabase;


    /**
     * Date format that api expects.
     *
     * @var string
     */
    protected $DATE_FORMAT;

    /**
     * Run parent setup and set global values.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();
        $this->DATE_FORMAT = config('app.api_datetime_format');
    }

    protected function runGetIndexTest($experienceableData, $actingAsUser, $route)
    {
        $work = factory(ExperienceWork::class)->create($experienceableData);
        $personal = factory(ExperiencePersonal::class)->create($experienceableData);
        $education = factory(ExperienceEducation::class)->create($experienceableData);
        $award = factory(ExperienceAward::class)->create($experienceableData);
        $community = factory(ExperienceCommunity::class)->create($experienceableData);

        $response = $this->actingAs($actingAsUser)->json('get', $route);
        $response->assertOk();

        // The response should be an array, with one element per experience.
        $response->assertJsonCount(5);

        // Sanity check to ensure our ExperienceResource class does a reasonable transformation,
        // in particular checking that it adds the 'type'=>'work' field.
        $response->assertJsonFragment([
            'id'=>$work->id,
            'type' => 'work',
            'title' => $work->title,
            'organization' => $work->organization,
            ]);

        // Ensure all the experiences are present in the response.
        $response->assertJsonFragment((new ExperienceResource($work))->resolve());
        $response->assertJsonFragment((new ExperienceResource($personal))->resolve());
        $response->assertJsonFragment((new ExperienceResource($education))->resolve());
        $response->assertJsonFragment((new ExperienceResource($award))->resolve());
        $response->assertJsonFragment((new ExperienceResource($community))->resolve());
    }

    public function testGetByApplicant()
    {
        $applicant = factory(Applicant::class)->create();
        $experienceableData = [
            'experienceable_id' => $applicant->id,
            'experienceable_type' => 'applicant'
        ];
        $this->runGetIndexTest(
            $experienceableData,
            $applicant->user,
            route('api.v1.applicant.experience.index', $applicant->id)
        );
    }

    public function testGetByApplication()
    {
        $application = factory(JobApplication::class)->create();
        $experienceableData = [
            'experienceable_id' => $application->id,
            'experienceable_type' => 'application'
        ];
        $this->runGetIndexTest(
            $experienceableData,
            $application->applicant->user,
            route('api.v2.application.experience.index', $application->id)
        );
    }

    public function testStoreWork()
    {
        $faker = \Faker\Factory::create();

        // Id, experienceable_id, and experienceable_type should be ignored by the store request.
        $workData = [
            'id' => 0,
            'title' => $faker->jobTitle(),
            'organization' => $faker->company(),
            'group' => $faker->company(),
            'is_active' => $faker->boolean(),
            'start_date' => $faker->dateTimeBetween('-3 years', '-1 years')
                ->setTime(0, 0, 0, 0)->format($this->DATE_FORMAT),
            'end_date' => $faker->dateTimeBetween('-1 years', '-1 day')
                ->setTime(0, 0, 0, 0)->format($this->DATE_FORMAT),
            'is_education_requirement' => $faker->boolean(),
            'experienceable_id' => 0,
            'experienceable_type' => '',
        ];

        $applicant = factory(Applicant::class)->create();
        $response = $this->actingAs($applicant->user)->json(
            'post',
            route('api.v1.applicant.experience-work.store', $applicant->id),
            $workData
        );
        $response->assertOk();

        $expectData = collect($workData)
            ->except(['id'])
            ->merge([
                'experienceable_id' => $applicant->id,
                'experienceable_type' => 'applicant',
            ])->all();
        $response->assertJsonFragment($expectData);
        $this->assertTrue($response->decodeResponseJson('id') !== 0);
    }

    public function testStorePersonal()
    {
        $faker = \Faker\Factory::create();

        // Id, experienceable_id, and experienceable_type should be ignored by the store request.
        $personalData = [
            'id' => 0,
            'title' => $faker->jobTitle(),
            'description' => $faker->paragraph(),
            'is_shareable' => $faker->boolean(),
            'is_active' => $faker->boolean(),
            'start_date' => $faker->dateTimeBetween('-3 years', '-1 years')
                ->setTime(0, 0, 0, 0)->format($this->DATE_FORMAT),
            'end_date' => $faker->dateTimeBetween('-1 years', '-1 day')
                ->setTime(0, 0, 0, 0)->format($this->DATE_FORMAT),
            'is_education_requirement' => $faker->boolean(),
            'experienceable_id' => 0,
            'experienceable_type' => '',
        ];

        $applicant = factory(Applicant::class)->create();
        $response = $this->actingAs($applicant->user)->json(
            'post',
            route('api.v1.applicant.experience-personal.store', $applicant->id),
            $personalData
        );
        $response->assertOk();

        $expectData = collect($personalData)
            ->except(['id'])
            ->merge([
                'experienceable_id' => $applicant->id,
                'experienceable_type' => 'applicant',
            ])->all();
        $response->assertJsonFragment($expectData);
        $this->assertTrue($response->decodeResponseJson('id') !== 0);
    }

    public function testStoreEducation()
    {
        $faker = \Faker\Factory::create();

        // Id, experienceable_id, and experienceable_type should be ignored by the store request.
        $educationData = [
            'id' => 0,
            'education_type_id' => EducationType::inRandomOrder()->first->id,
            'description' => $faker->paragraph(),
            'is_shareable' => $faker->boolean(),
            'is_active' => $faker->boolean(),
            'start_date' => $faker->dateTimeBetween('-3 years', '-1 years')
                ->setTime(0, 0, 0, 0)->format($this->DATE_FORMAT),
            'end_date' => $faker->dateTimeBetween('-1 years', '-1 day')
                ->setTime(0, 0, 0, 0)->format($this->DATE_FORMAT),
            'is_education_requirement' => $faker->boolean(),
            'experienceable_id' => 0,
            'experienceable_type' => '',
        ];

        $applicant = factory(Applicant::class)->create();
        $response = $this->actingAs($applicant->user)->json(
            'post',
            route('api.v1.applicant.experience-personal.store', $applicant->id),
            $educationData
        );
        $response->assertOk();

        $expectData = collect($educationData)
            ->except(['id'])
            ->merge([
                'experienceable_id' => $applicant->id,
                'experienceable_type' => 'applicant',
            ])->all();
        $response->assertJsonFragment($expectData);
        $this->assertTrue($response->decodeResponseJson('id') !== 0);
    }
}
