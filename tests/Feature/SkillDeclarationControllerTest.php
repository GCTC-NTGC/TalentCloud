<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\SkillDeclaration;

class SkillDeclarationControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Run parent setup and provide reusable factories.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->skillDeclaration = factory(SkillDeclaration::class)->create();
    }

    /**
     * Ensure a skill declaration can be updated.
     *
     * @return void
     */
    public function testUpdateSkillDeclaration(): void
    {
        $oldDeclaration = clone $this->skillDeclaration;
        $expected = 'This is a new sample skill declaration description';
        $this->skillDeclaration->description = $expected;
        $response = $this->actingAs($this->skillDeclaration->skillable->user)
                            ->followingRedirects()
                            ->json(
                                'PUT',
                                'skill-declarations/' . $this->skillDeclaration->id,
                                $this->skillDeclaration->toArray()
                            );
        $response->assertStatus(200);
        $this->assertDatabaseHas(
            'skill_declarations',
            $this->skillDeclaration->makeHidden(
                [
                    'created_at',
                    'updated_at'
                ]
            )->attributesToArray()
        );
        $this->assertDatabaseMissing(
            'skill_declarations',
            $oldDeclaration->makeHidden(
                [
                    'created_at',
                    'updated_at'
                ]
            )->attributesToArray()
        );
    }
}
