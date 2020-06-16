<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Applicant;
use App\Models\JobApplication;
use App\Models\Lookup\CitizenshipDeclaration;
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
        ];

        $response = $this->actingAs($applicant->user)
            ->json('post', "$this->baseUrl/applications/$application->id/basic", $expected);
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
            ->json('post', "$this->baseUrl/applications/$application->id/basic", $invalid);
        $response->assertStatus(422);
        $response->assertJsonFragment(['message' => 'The given data was invalid.']);
    }
}
