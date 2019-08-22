<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Lookup\Department;

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
        $exampleDept2 = [
            'id' => 2,
            'en' => [
                'name' => 'Natural Resources Canada',
                'impact' => 'Natural Resources Canada seeks to enhance the responsible development and use of Canada\'s natural resources and the competitiveness of Canada\'s natural resources products.'
            ],
            'fr' => [
                'name' => 'Ressources naturelles Canada',
                'impact' => 'Ressources naturelles Canada cherche à renforcer le développement et l\'utilisation responsables des ressources naturelles du Canada et la compétitivité des produits tirés des ressources naturelles du pays.'
            ]
        ];
        $response->assertJsonFragment($exampleDept);
        // Ensure all results aren't just copies of the first
        $response->assertJsonFragment($exampleDept2);
        // Ensure all the departments are returned
        $response->assertJsonCount(Department::count());
    }
}
