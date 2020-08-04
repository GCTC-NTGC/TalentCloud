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
use App\Models\Lookup\AwardRecipientType;
use App\Models\Lookup\AwardRecognitionType;
use App\Models\Lookup\EducationStatus;
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

    protected function makeWorkData()
    {
        $faker = \Faker\Factory::create();

        // Id, experienceable_id, and experienceable_type should be ignored by the store request.
        return [
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
    }

    protected function makePersonalData()
    {
        $faker = \Faker\Factory::create();

        // Id, experienceable_id, and experienceable_type should be ignored by the store request.
        return [
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
    }

    protected function makeEducationData()
    {
        $faker = \Faker\Factory::create();

        // Id, experienceable_id, and experienceable_type should be ignored by the store request.
        return [
            'id' => 0,
            'education_type_id' => EducationType::inRandomOrder()->first()->id,
            'area_of_study' => $faker->words(3, true),
            'institution' => $faker->company(),
            'education_status_id' => EducationStatus::inRandomOrder()->first()->id,
            'is_active' => $faker->boolean(),
            'start_date' => $faker->dateTimeBetween('-3 years', '-1 years')
                ->setTime(0, 0, 0, 0)->format($this->DATE_FORMAT),
            'end_date' => $faker->dateTimeBetween('-1 years', '-1 day')
                ->setTime(0, 0, 0, 0)->format($this->DATE_FORMAT),
            'is_education_requirement' => $faker->boolean(),
            'experienceable_id' => 0,
            'experienceable_type' => '',
        ];
    }

    protected function makeAwardData()
    {
        $faker = \Faker\Factory::create();

        // Id, experienceable_id, and experienceable_type should be ignored by the store request.
        return [
            'id' => 0,
            'title' => $faker->words(3, true),
            'award_recipient_type_id' => AwardRecipientType::inRandomOrder()->first()->id,
            'issued_by' => $faker->company(),
            'award_recognition_type_id' => AwardRecognitionType::inRandomOrder()->first()->id,
            'awarded_date' => $faker->dateTimeBetween('-3 years', '-1 years')
                ->setTime(0, 0, 0, 0)->format($this->DATE_FORMAT),
            'is_education_requirement' => $faker->boolean(),
            'experienceable_id' => 0,
            'experienceable_type' => 'applicant',
        ];
    }

    protected function makeCommunityData()
    {
        $faker = \Faker\Factory::create();

        // Id, experienceable_id, and experienceable_type should be ignored by the store request.
        return [
            'id' => 0,
            'title' => $faker->words(3, true),
            'group' => $faker->company(),
            'project' => $faker->sentence(),
            'is_active' => false,
            'start_date' => $faker->dateTimeBetween('-3 years', '-1 years')
                ->setTime(0, 0, 0, 0)->format($this->DATE_FORMAT),
            'end_date' => $faker->dateTimeBetween('-1 years', '-1 day')
                ->setTime(0, 0, 0, 0)->format($this->DATE_FORMAT),
            'is_education_requirement' => $faker->boolean(),
            'experienceable_id' => 0,
            'experienceable_type' => 'applicant',
        ];
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
        $workData = $this->makeWorkData();
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
        $id = $response->decodeResponseJson('id');
        $this->assertNotNull(ExperienceWork::find($id));
    }

    public function testStorePersonal()
    {
        $personalData = $this->makePersonalData();

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
        $id = $response->decodeResponseJson('id');
        $this->assertNotNull(ExperiencePersonal::find($id));
    }

    public function testStoreEducation()
    {
        $educationData = $this->makeEducationData();

        $applicant = factory(Applicant::class)->create();
        $response = $this->actingAs($applicant->user)->json(
            'post',
            route('api.v1.applicant.experience-education.store', $applicant->id),
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
        $id = $response->decodeResponseJson('id');
        $this->assertNotNull(ExperienceEducation::find($id));
    }

    public function testStoreAward()
    {
        $awardData = $this->makeAwardData();

        $applicant = factory(Applicant::class)->create();
        $response = $this->actingAs($applicant->user)->json(
            'post',
            route('api.v1.applicant.experience-award.store', $applicant->id),
            $awardData
        );
        $response->assertOk();

        $expectData = collect($awardData)
            ->except(['id'])
            ->merge([
                'experienceable_id' => $applicant->id,
                'experienceable_type' => 'applicant',
            ])->all();
        $response->assertJsonFragment($expectData);
        $id = $response->decodeResponseJson('id');
        $this->assertNotNull(ExperienceAward::find($id));
    }

    public function testStoreCommunity()
    {
        $communityData = $this->makeCommunityData();

        $applicant = factory(Applicant::class)->create();
        $response = $this->actingAs($applicant->user)->json(
            'post',
            route('api.v1.applicant.experience-community.store', $applicant->id),
            $communityData
        );
        $response->assertOk();

        $expectData = collect($communityData)
            ->except(['id'])
            ->merge([
                'experienceable_id' => $applicant->id,
                'experienceable_type' => 'applicant',
            ])->all();
        $response->assertJsonFragment($expectData);
        $id = $response->decodeResponseJson('id');
        $this->assertNotNull(ExperienceCommunity::find($id));
    }

    public function testUpdateWork()
    {
        $work = factory(ExperienceWork::class)->create();
        $updateData = $this->makeWorkData();
        $response = $this->actingAs($work->experienceable->user)->json(
            'put',
            route('api.v1.experience-work.update', $work->id),
            $updateData
        );
        $expectData = collect($updateData)
            ->merge([
                'id' => $work->id,
                'experienceable_id' => $work->experienceable->id,
                'experienceable_type' => 'applicant',
            ])->all();
        $response->assertOk();
        $response->assertJsonFragment($expectData);
        $this->assertDatabaseHas('experiences_work', $expectData);
    }

    public function testUpdatePersonal()
    {
        $personal = factory(ExperiencePersonal::class)->create();
        $updateData = $this->makePersonalData();
        $response = $this->actingAs($personal->experienceable->user)->json(
            'put',
            route('api.v1.experience-personal.update', $personal->id),
            $updateData
        );
        $expectData = collect($updateData)
            ->merge([
                'id' => $personal->id,
                'experienceable_id' => $personal->experienceable->id,
                'experienceable_type' => 'applicant',
            ])->all();
        $response->assertOk();
        $response->assertJsonFragment($expectData);
        $this->assertDatabaseHas('experiences_personal', $expectData);
    }

    public function testUpdateEducation()
    {
        $education = factory(ExperienceEducation::class)->create();
        $updateData = $this->makePersonalData();
        $response = $this->actingAs($education->experienceable->user)->json(
            'put',
            route('api.v1.experience-education.update', $education->id),
            $updateData
        );
        $expectData = collect($updateData)
            ->merge([
                'id' => $education->id,
                'experienceable_id' => $education->experienceable->id,
                'experienceable_type' => 'applicant',
            ])->all();
        $response->assertOk();
        $response->assertJsonFragment($expectData);
        $this->assertDatabaseHas('experiences_education', $expectData);
    }

    public function testUpdateAward()
    {
        $award = factory(ExperienceAward::class)->create();
        $updateData = $this->makePersonalData();
        $response = $this->actingAs($award->experienceable->user)->json(
            'put',
            route('api.v1.experience-award.update', $award->id),
            $updateData
        );
        $expectData = collect($updateData)
            ->merge([
                'id' => $award->id,
                'experienceable_id' => $award->experienceable->id,
                'experienceable_type' => 'applicant',
            ])->all();
        $response->assertOk();
        $response->assertJsonFragment($expectData);
        $this->assertDatabaseHas('experiences_award', $expectData);
    }

    public function testUpdateCommunity()
    {
        $community = factory(ExperienceCommunity::class)->create();
        $updateData = $this->makePersonalData();
        $response = $this->actingAs($community->experienceable->user)->json(
            'put',
            route('api.v1.experience-community.update', $community->id),
            $updateData
        );
        $expectData = collect($updateData)
            ->merge([
                'id' => $community->id,
                'experienceable_id' => $community->experienceable->id,
                'experienceable_type' => 'applicant',
            ])->all();
        $response->assertOk();
        $response->assertJsonFragment($expectData);
        $this->assertDatabaseHas('experiences_community', $expectData);
    }

    public function testDeleteWork()
    {
        $work = factory(ExperienceWork::class)->create();
        $response = $this->actingAs($work->experienceable->user)->json(
            'delete',
            route('api.v1.experience-work.delete', $work->id)
        );
        $response->assertOk();
        $this->assertNull(ExperienceWork::find($work->id));
    }
    public function testDeletePersonal()
    {
        $personal = factory(ExperiencePersonal::class)->create();
        $response = $this->actingAs($personal->experienceable->user)->json(
            'delete',
            route('api.v1.experience-personal.delete', $personal->id)
        );
        $response->assertOk();
        $this->assertNull(ExperiencePersonal::find($personal->id));
    }
    public function testDeleteEducation()
    {
        $education = factory(ExperienceEducation::class)->create();
        $response = $this->actingAs($education->experienceable->user)->json(
            'delete',
            route('api.v1.experience-education.delete', $education->id)
        );
        $response->assertOk();
        $this->assertNull(ExperienceEducation::find($education->id));
    }
    public function testDeleteAward()
    {
        $award = factory(ExperienceAward::class)->create();
        $response = $this->actingAs($award->experienceable->user)->json(
            'delete',
            route('api.v1.experience-award.delete', $award->id)
        );
        $response->assertOk();
        $this->assertNull(ExperienceAward::find($award->id));
    }
    public function testDeleteCommunity()
    {
        $community = factory(ExperienceCommunity::class)->create();
        $response = $this->actingAs($community->experienceable->user)->json(
            'delete',
            route('api.v1.experience-community.delete', $community->id)
        );
        $response->assertOk();
        $this->assertNull(ExperienceCommunity::find($community->id));
    }
}
