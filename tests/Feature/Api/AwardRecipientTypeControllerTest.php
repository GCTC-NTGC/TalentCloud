<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Lookup\AwardRecipientType;

class AwardRecipientTypeControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        $response = $this->json('get', 'api/v1/award-recipient-types');
        $response->assertOk();
        // These sample award recipient types are added via migration.
        $exampleType = [
            'id' => 3,
            'key' => 'organization',
            'name' => [
                'en' => 'My organization',
                'fr' => 'Mon organisation'
            ],
        ];
        $exampleType2 = [
            'id' => 2,
            'key' => 'project',
            'name' => [
                'en' => 'My project',
                'fr' => 'Mon projet'
            ],
        ];
        $response->assertJsonFragment($exampleType);
        // Ensure all results aren't just copies of the first.
        $response->assertJsonFragment($exampleType2);
        // Ensure all the recipient types are returned.
        $response->assertJsonCount(AwardRecipientType::count());
    }
}
