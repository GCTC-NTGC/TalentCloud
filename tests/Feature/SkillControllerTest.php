<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SkillControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        $response = $this->json('get', 'api/skills');
        $response->assertOk();
        // This is one of the skills added by migrations. Should always be present after refreshing database
        $exampleSkill = [
            'id' => 1,
            'skill_type_id' => 2,
            'name' => 'Front-end development',
            'description' =>'Defined as: Developing web applications using HTML5, CSS3, Javascript',
            'en' => [
                'name' =>'Front-end development',
                'description' =>'Defined as: Developing web applications using HTML5, CSS3, Javascript',
            ],
            'fr' => [
                'name' => 'Développement frontal',
                'description' => 'Se définissant comme suit : Développement d\'applications Web à l\'aide de HTML5, CSS3 et JavaScript.'
            ]
        ];
        $response->assertJsonFragment($exampleSkill);
    }
}
