<?php

namespace Tests\Feature;

use App\Models\Applicant;
use App\Models\Classification;
use App\Models\Lookup\CitizenshipDeclaration;
use App\Models\Lookup\VeteranStatus;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class ApplicantControllerTest extends TestCase
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
        $this->baseUrl = 'api/v1';
        $this->faker = \Faker\Factory::create();
    }

    public function testGetProfile(): void
    {
        $applicant = factory(Applicant::class)->create();

        $response = $this->actingAs($applicant->user)
            ->getJson("$this->baseUrl/applicant/$applicant->id/profile");
        $response->assertOk();
        $response->assertJsonFragment([
            'citizenship_declaration_id' => $applicant->citizenship_declaration_id,
            'veteran_status_id' => $applicant->veteran_status_id,
            'classifications' => $applicant->classifications->toArray(),
        ]);
    }

    public function testUpdateProfile(): void
    {
        $applicant = factory(Applicant::class)->create();

        $updateData = [
            'citizenship_declaration_id' => CitizenshipDeclaration::inRandomOrder()->first()->id,
            'veteran_status_id' => VeteranStatus::inRandomOrder()->first()->id,
            'classifications' => [
                ['id' => 1, 'level' => 1, 'order' => 0],
                ['id' => 2, 'level' => 2, 'order' => 1],
            ],
        ];

        $response = $this->actingAs($applicant->user)
            ->putJson("$this->baseUrl/applicant/$applicant->id/profile", $updateData);
        $response->assertOk();

        $expectedData = [
            'citizenship_declaration_id' => $updateData['citizenship_declaration_id'],
            'veteran_status_id' => $updateData['veteran_status_id'],
            'classifications' => $applicant->classifications->toArray(),
        ];
        $response->assertJsonFragment($expectedData);

        $gov_classifications = $applicant->classifications->map(function ($classification) {
            return $classification->gov_classification;
        });
        $this->assertDatabaseHas('applicant_classification', $gov_classifications[0]->toArray());
        $this->assertDatabaseHas('applicant_classification', $gov_classifications[1]->toArray());
    }
}
