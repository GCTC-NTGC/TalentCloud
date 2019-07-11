<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DepartmentControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        $response = $this->json('get', 'api/departments');
        $response->assertOk();
        // This is one of the departments added by mmigrations. Should always be present after refreshing database
        $exampleDept = [
            'id' => 1,
            'en' => [
                'name' => 'Treasury Board of Canada Secretariat',
                'impact' => 'The Treasury Board of Canada Secretariat provides advice and makes recommendations on how the government spends money, how it regulates and how it is managed ensuring tax dollars are spent wisely and effectively for Canadians.'
            ],
            'fr' => [
                'name' => 'Secrétariat du Conseil du Trésor du Canada',
                'impact' => 'Le Secrétariat du Conseil du Trésor du Canada fournit des conseils et des recommandations sur la façon dont le gouvernement investit dans les programmes et les services, ainsi que sur la façon dont il en assure la réglementation et la gestion pour faire en sorte que l\'argent des contribuables soit utilisé de manière judicieuse et efficace pour les Canadiens.'
            ]
        ];
        $response->assertJsonFragment($exampleDept);
    }
}
