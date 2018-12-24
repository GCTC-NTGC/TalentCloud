<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\User;

class JobControllerTest extends TestCase
{
    /**
     * Ensure a manager can view their index page.
     *
     * @return void
     */
    public function testManagerIndex()
    {
        $manager = factory(User::class)->make(
            [
                'user_role_id' => 2
            ]
        );

        $response = $this->actingAs($manager)
                        ->get('manager/jobs');
        $response->assertStatus(200);
    }
}
