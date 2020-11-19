<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Applicant;
use App\Models\ExperienceSkill;
use App\Models\JobApplication;
use App\Models\Lookup\ApplicationStatus;
use App\Models\Lookup\CitizenshipDeclaration;
use App\Models\Lookup\JobApplicationStep;
use App\Models\Lookup\VeteranStatus;

class ApplicationControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Base route for the API calls.
     *
     * @var string
     */
    protected $baseUrl;

    /**
     * Run parent setup and set global values.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();
        $this->baseUrl = 'api/v2';
        $this->faker = \Faker\Factory::create();
    }

    public function testGetBasics(): void
    {
        $applicant = factory(Applicant::class)->create();
        $application = factory(JobApplication::class)->states('draft')->create([
            'applicant_id' => $applicant->id
        ]);

        $response = $this->actingAs($applicant->user)
            ->json('get', "$this->baseUrl/applications/$application->id/basic");
        $response->assertOk();
        $response->assertJsonStructure([
            'id',
            'job_poster_id',
            'application_status_id',
            'citizenship_declaration_id',
            'veteran_status_id',
            'applicant_id',
            'applicant_snapshot_id',
            'language_requirement_confirmed',
            'language_test_confirmed',
            'education_requirement_confirmed',
            'user_name',
            'user_email',
            'created_at',
            'updated_at',
        ]);
    }

    public function testUnauthorizedBasics(): void
    {
        $application = factory(JobApplication::class)->states('draft')->create();

        $response = $this->json('get', "$this->baseUrl/applications/$application->id/basic");
        $response->assertStatus(403);
    }

    public function testUpdateBasics(): void
    {
        $applicant = factory(Applicant::class)->create();
        $application = factory(JobApplication::class)->states('draft')->create([
            'applicant_id' => $applicant->id
        ]);

        $citizenship = CitizenshipDeclaration::where('name', 'citizen')->value('id');
        $veteranStatus = VeteranStatus::where('name', 'none')->value('id');

        $expected = [
            'citizenship_declaration_id' => $citizenship,
            'veteran_status_id' => $veteranStatus,
            'language_requirement_confirmed' => true,
            'language_test_confirmed' => true,
            'education_requirement_confirmed' => true,
            'share_with_managers' => false,
        ];

        $response = $this->actingAs($applicant->user)
            ->json('put', "$this->baseUrl/applications/$application->id/basic", $expected);
        $response->assertOk();
        $response->assertJsonFragment($expected);
    }

    public function testUpdateBasicsValidation(): void
    {
        $applicant = factory(Applicant::class)->create();
        $application = factory(JobApplication::class)->states('draft')->create([
            'applicant_id' => $applicant->id
        ]);

        $invalid = [
            'citizenship_declaration_id' => 'text',
            'language_requirement_confirmed' => 2,
            'education_requirement_confirmed' => 'text',
        ];

        $response = $this->actingAs($applicant->user)
            ->json('put', "$this->baseUrl/applications/$application->id/basic", $invalid);
        $response->assertStatus(422);
        $response->assertJsonFragment(['message' => 'The given data was invalid.']);
    }

    public function testTouchJobApplicationStep(): void
    {
        $applicant = factory(Applicant::class)->create();
        // Set basic info step values to pass validation.
        $application = factory(JobApplication::class)->states('draft')->create([
            'applicant_id' => $applicant->id,
            'language_requirement_confirmed' => true,
            'education_requirement_confirmed' => true,
            'language_test_confirmed' => true,
        ]);
        $defaultJobApplicationSteps = [
            'basic' => 'default',
            'experience' => 'default',
            'skills' => 'default',
            'fit' => 'default',
            'review' => 'default',
            'submission' => 'default',
        ];

        $basicStep = JobApplicationStep::where('name', 'basic')->first();
        $application->attachSteps();
        $application->refresh();

        // Assert that the basic step is set to touch after request a request.
        $response = $this->actingAs($applicant->user)
        ->json('put', "$this->baseUrl/applications/$application->id/job-application-steps/$basicStep->id", []);
        $response->assertOk();

        // Expect the basic step to be set to touch and the validation to pass.
        $application->refresh();
        $expectedJobApplicationSteps = array_replace($defaultJobApplicationSteps, ['basic' => 'complete']);
        $response->assertJsonFragment($expectedJobApplicationSteps);

        // Assert that the experience step is set to touch after request a request.
        $experienceStep = JobApplicationStep::where('name', 'experience')->first();
        $response = $this->actingAs($applicant->user)
        ->json('put', "$this->baseUrl/applications/$application->id/job-application-steps/$experienceStep->id", []);
        $response->assertOk();

        // Expect the experience step to be set to touch and the validation to fail.
        $application->refresh();
        $expectedJobApplicationSteps = array_replace($expectedJobApplicationSteps, ['experience' => 'error']);
        $response->assertJsonFragment($expectedJobApplicationSteps);

        // Test calling the basic step again to ensure it doesn't make any unexpected changes.
        $response = $this->actingAs($applicant->user)
        ->json('put', "$this->baseUrl/applications/$application->id/job-application-steps/$basicStep->id", []);
        $response->assertOk();

        $application->refresh();
        $response->assertJsonFragment($expectedJobApplicationSteps);
    }

    public function testSubmitApplication(): void
    {
        $applicant = factory(Applicant::class)->create();
        $application = factory(JobApplication::class)->states(['draft', 'version2'])->create([
            'applicant_id' => $applicant->id,
            'language_test_confirmed' => true,
        ]);

        $invalid = [
            'submission_signature' => null,
            'submission_date' => null,
        ];

        $response = $this->actingAs($applicant->user)
        ->json('put', "$this->baseUrl/applications/$application->id/submit", $invalid);
        $response->assertStatus(422);

        $expected = [
            'submission_signature' => $this->faker->name(),
            'submission_date' =>  $this->faker->dateTimeBetween('yesterday', 'tomorrow')->format('Y-m-d H:i:s'),
        ];

        $response = $this->actingAs($applicant->user)
        ->json('put', "$this->baseUrl/applications/$application->id/submit", $expected);
        $response->assertStatus(200);

        // Assert request fails after the experiences are remove.
        $incompleteApplication = factory(JobApplication::class)->states(['draft', 'version2'])->create([
            'applicant_id' => $applicant->id,
            'language_test_confirmed' => true,
        ]);
        ExperienceSkill::truncate();

        $response = $this->actingAs($applicant->user)
        ->json('put', "$this->baseUrl/applications/$incompleteApplication->id/submit", $expected);
        $response->assertStatus(422);
        $response->assertJsonFragment([ 'message' => 'The given data was invalid.']);
    }
}
