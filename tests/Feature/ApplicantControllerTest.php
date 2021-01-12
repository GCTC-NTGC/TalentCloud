<?php

namespace Tests\Feature;

use App\Models\Applicant;
use App\Models\Classification;
use App\Models\Lookup\CitizenshipDeclaration;
use App\Models\Lookup\VeteranStatus;
use Illuminate\Foundation\Testing\RefreshDatabase;
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
            ->getJson(route('api.v1.applicant.profile', ['applicant' => $applicant]));
        $response->assertOk();
        $response->assertJsonFragment([
            'citizenship_declaration_id' => $applicant->citizenship_declaration_id,
            'veteran_status_id' => $applicant->veteran_status_id,
            'applicant_classifications' => $applicant->applicant_classifications->toArray(),
        ]);
    }

    public function testUpdateProfile(): void
    {
        $applicant = factory(Applicant::class)->create();
        $applicant->applicant_classifications()->delete();

        // Ensure that submitting applicant classifications creates new elements.
        $newApplicantClassification = [
            'id' => 0,
            'applicant_id' => $applicant->id,
            'classification_id' => Classification::inRandomOrder()->first()->id,
            'level' => 5,
            'order' => 1,
        ];
        $updateData = [
            'citizenship_declaration_id' => CitizenshipDeclaration::inRandomOrder()->first()->id,
            'veteran_status_id' => VeteranStatus::inRandomOrder()->first()->id,
            'applicant_classifications' => [
                0 => $newApplicantClassification
            ],
        ];
        $response = $this->actingAs($applicant->user)
            ->putJson(route('api.v1.applicant.profile.update', ['applicant' => $applicant]), $updateData);
        $response->assertOk();

        $expectedData = [
            'citizenship_declaration_id' => $updateData['citizenship_declaration_id'],
            'veteran_status_id' => $updateData['veteran_status_id'],
            'applicant_classifications' => array_except($updateData['applicant_classifications'], ['0.id']),
        ];

        $response->assertJson($expectedData);
        $this->assertDatabaseHas(
            'applicant_classifications',
            $expectedData['applicant_classifications'][0]
        );

        // Ensure that submitting applicant classifications deletes elements that were not resubmitted
        // and creates new elements/updates old elements.
        $oldApplicantClassification = $applicant->applicant_classifications->first()->toArray();
        $updateData = [
            'citizenship_declaration_id' => CitizenshipDeclaration::inRandomOrder()->first()->id,
            'veteran_status_id' => VeteranStatus::inRandomOrder()->first()->id,
            'applicant_classifications' => [
                0 => $oldApplicantClassification,
                1 => $newApplicantClassification,
            ],
        ];
        $response = $this->actingAs($applicant->user)
            ->putJson(route('api.v1.applicant.profile.update', ['applicant' => $applicant]), $updateData);
        $response->assertOk();

        $applicant->refresh();
        $expectedData = [
            'citizenship_declaration_id' => $updateData['citizenship_declaration_id'],
            'veteran_status_id' => $updateData['veteran_status_id'],
            'applicant_classifications' => array_except($updateData['applicant_classifications'], ['0.id', '1.id']),
        ];

        $response->assertJson($expectedData);
        $this->assertDatabaseHas('applicant_classifications', $expectedData['applicant_classifications'][0]);
        $this->assertDatabaseHas('applicant_classifications', $expectedData['applicant_classifications'][1]);


        // Ensure that submitting no applicant classifications deletes all
        // previous applicant classifications attached to applicant.
        $updateData = [
            'citizenship_declaration_id' => CitizenshipDeclaration::inRandomOrder()->first()->id,
            'veteran_status_id' => VeteranStatus::inRandomOrder()->first()->id,
            'applicant_classifications' => [],
        ];

        $response = $this->actingAs($applicant->user)
            ->putJson(route('api.v1.applicant.profile.update', ['applicant' => $applicant]), $updateData);
        $response->assertOk();

        $applicant->refresh();
        $expectedData = [
            'citizenship_declaration_id' => $updateData['citizenship_declaration_id'],
            'veteran_status_id' => $updateData['veteran_status_id'],
            'applicant_classifications' => [],
        ];
        $response->assertJson($expectedData);
        $this->assertEmpty($applicant->applicant_classifications);
    }
}
