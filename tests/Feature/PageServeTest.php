<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class PageServeTest extends TestCase {

    use WithoutMiddleware;

    //Moving to Selenium browser tests

    public function makeUser() {
        $user = factory(\App\Models\User::class)->make();
        return $user;
    }

    public function testRoot() {
        // Make a user
        $user = $this->makeUser();
        // Test homepage as user with session
        $response = $this->actingAs($user)
                        ->get('/');
        // Should be successful
        $response->assertStatus(200);
        $response->assertViewIs('applicant.home');
    }

}
