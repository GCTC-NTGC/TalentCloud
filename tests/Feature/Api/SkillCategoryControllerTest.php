<?php

namespace Tests\Feature\Api;

use App\Models\SkillCategory;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SkillCategoryControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Base route for API calls.
     *
     * @var string
     */
    protected $baseUrl;

    /**
     * Run parent setup and create helper function.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();
        $this->baseUrl = 'api/v1';
    }

    /**
     * Create skill category data.
     */
    protected function makeSkillCategoryData()
    {
        return (array) factory(SkillCategory::class, 1)->create();
    }

    /**
     * Test get skill category index.
     */
    public function testGetIndex()
    {
        $response = $this->json(
            'get',
            $this->baseUrl . '/skill-categories'
        );
        $response->assertOk();
    }

    /**
     * Test get skill category.
     */
    public function testGetSkillCategory()
    {
        $skillCategoryData = $this->makeSkillCategoryData();
        $response = $this->json(
            'get',
            $this->baseUrl . '/skill-categories',
            $skillCategoryData
        );
        $response->assertOk();
    }
}
