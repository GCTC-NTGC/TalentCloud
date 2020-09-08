<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Lookup\EducationType;

class EducationTypeControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        $response = $this->json('get', 'api/v1/education-types');
        $response->assertOk();
        // This is one of the education types added by migrations. Should always be present after refreshing database.
        $exampleType = [
            'id' => 3,
            'key' => 'masters',
            'name' => [
                'en' => 'Master\'s Degree',
                'fr' => 'Maîtrise'
            ],
        ];
        $exampleType2 = [
            'id' => 5,
            'key' => 'post_doctoral',
            'name' => [
                'en' => 'Post-doctoral Fellowship',
                'fr' => 'Bourse postdoctorale'
            ],
        ];
        $response->assertJsonFragment($exampleType);
        // Ensure all results aren't just copies of the first.
        $response->assertJsonFragment($exampleType2);
        // Ensure all the education types are returned.
        $response->assertJsonCount(EducationType::count());
    }
}
