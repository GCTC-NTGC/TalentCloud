<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Lookup\EducationStatus;

class EducationStatusControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        $response = $this->json('get', 'api/v1/education-statuses');
        $response->assertOk();
        // This is one of the education statuses added by migrations.
        // Should always be present after refreshing database.
        $exampleStatus = [
            'id' => 3,
            'key' => 'in_progress',
            'name' => [
                'en' => 'In progress',
                'fr' => 'En cours'
            ],
        ];
        $exampleStatus2 = [
            'id' => 5,
            'key' => 'incomplete',
            'name' => [
                'en' => 'Incomplete',
                'fr' => 'Incomplet'
            ],
        ];
        $response->assertJsonFragment($exampleStatus);
        // Ensure all results aren't just copies of the first.
        $response->assertJsonFragment($exampleStatus2);
        // Ensure all the education statuses are returned.
        $response->assertJsonCount(EducationStatus::count());
    }
}
