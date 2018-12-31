<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\Manager;

class JobControllerTest extends TestCase
{
    /**
     * Ensure a manager can view their index page.
     *
     * @return void
     */
    public function testManagerIndex()
    {
        $manager = factory(Manager::class)->create();

        $response = $this->actingAs($manager->user)
                        ->get('manager/jobs');
        $response->assertStatus(200);
    }
}
