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
}
