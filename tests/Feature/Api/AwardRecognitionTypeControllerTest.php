<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Lookup\AwardRecognitionType;

class AwardRecognitionTypeControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        $response = $this->json('get', 'api/v1/award-recognition-types');
        $response->assertOk();
        // This is one of the recognition types added by migrations. Should always be present after refreshing database.
        $exampleType = [
            'id' => 1,
            'key' => 'international',
            'name' => [
                'en' => 'International',
                'fr' => 'Internationale'
            ],
        ];
        $exampleType2 = [
            'id' => 5,
            'key' => 'community',
            'name' => [
                'en' => 'Community',
                'fr' => 'Communautaire'
            ],
        ];
        $response->assertJsonFragment($exampleType);
        // Ensure all results aren't just copies of the first.
        $response->assertJsonFragment($exampleType2);
        // Ensure all the recognition types are returned.
        $response->assertJsonCount(AwardRecognitionType::count());
    }
}
