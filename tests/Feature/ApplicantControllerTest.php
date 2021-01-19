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
        $applicant->applicant_classifications()->delete(); // Start with empty list.

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
                $newApplicantClassification
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
        // and creates new elements/updates old elements. Also, ensure duplicates are removed.
        $oldApplicantClassification = $applicant->applicant_classifications->first()->toArray();
        $duplicateApplicantClassification = $oldApplicantClassification;
        $newApplicantClassification = array_replace(
            $newApplicantClassification,
            [
                'classification_id' => $oldApplicantClassification['classification_id'] + 1,
                'level' => $newApplicantClassification['level'] + 1,
            ]
        );
        $updateData = [
            'citizenship_declaration_id' => CitizenshipDeclaration::inRandomOrder()->first()->id,
            'veteran_status_id' => VeteranStatus::inRandomOrder()->first()->id,
            'applicant_classifications' => [
                $oldApplicantClassification,
                $duplicateApplicantClassification,
                $newApplicantClassification,
            ],
        ];
        $response = $this->actingAs($applicant->user)
            ->putJson(route('api.v1.applicant.profile.update', ['applicant' => $applicant]), $updateData);
        $response->assertOk();

        $applicant->refresh();
        $expectedData = [
            'citizenship_declaration_id' => $updateData['citizenship_declaration_id'],
            'veteran_status_id' => $updateData['veteran_status_id'],
            'applicant_classifications' => [
                $oldApplicantClassification,
                array_except($newApplicantClassification, ['id']),
            ],
        ];

        $response->assertJson($expectedData);
        $this->assertDatabaseHas('applicant_classifications', $expectedData['applicant_classifications'][0]);
        $this->assertDatabaseHas('applicant_classifications', $expectedData['applicant_classifications'][1]);

        // Ensure that updating an existing applicant classification works correctly.
        $updatedApplicantClassification = array_replace(
            $oldApplicantClassification,
            [
                'level' => $oldApplicantClassification['level'] + 1,
            ]
        );
        $updateData = [
            'citizenship_declaration_id' => $applicant->citizenship_declaration_id,
            'veteran_status_id' => $applicant->veteran_status_id,
            'applicant_classifications' => [$updatedApplicantClassification],
        ];
        $response = $this->actingAs($applicant->user)
            ->putJson(route('api.v1.applicant.profile.update', ['applicant' => $applicant]), $updateData);
        $response->assertOk();

        $applicant->refresh();
        $expectedData = [
            'citizenship_declaration_id' => $updateData['citizenship_declaration_id'],
            'veteran_status_id' => $updateData['veteran_status_id'],
            'applicant_classifications' => [
                array_except($updatedApplicantClassification, ['updated_at'])
            ],
        ];
        $response->assertJson($expectedData);
        $this->assertDatabaseHas(
            'applicant_classifications',
            array_except($updatedApplicantClassification, ['updated_at'])
        );
        $this->assertDatabaseMissing('applicant_classifications', $oldApplicantClassification);
        $this->assertDatabaseMissing('applicant_classifications', array_except($newApplicantClassification, ['id']));

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
