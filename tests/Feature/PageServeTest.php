<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class PageServeTest extends TestCase {

    use WithoutMiddleware;

    $user = factory(\App\Models\User::class)->create();

    $testUser = $this->makeUser();

    public function testRoot() {
        // Test homepage as user with session
        $response = $this->actingAs($testUser)
                        ->get('/');
        // Should be successful
        $response->assertStatus(200);
        return $response;
    }

    $test1 = testRoot($testUser);
    $this->assertTrue($test1);

    testRoot($testUser);

    public function testHomeEnglish() {
        // Test English locale as user with session
        $response = $this->actingAs($testUser)
                        ->withSession(['locale' => 'en'])
                        ->get('/en');
        // Should be successful
        $response->assertStatus(200);
        return $response;
    }

    testHomeEnglish($testUser);

    public function testHomeFrench() {
        // Test French locale as user with session
        $response = $this->actingAs($testUser)
                        ->withSession(['locale' => 'fr'])
                        ->get('/fr');
        // Should be successful
        $response->assertStatus(200);
        return $response;
    }

    public function testFAQEnglish() {
        // Test homepage as user with session
        $response = $this->actingAs($user)
                        ->withSession(['locale' => 'en'])
                        ->get('/en/faq');

        // Should be successful
        $response->assertStatus(200);
        return $response;
    }

    public function testFAQFrench() {

        // Test homepage as user with session
        $response = $this->actingAs($user)
                        ->withSession(['locale' => 'fr'])
                        ->get('/en/faq');

        // Should be successful
        $response->assertStatus(200);
        return $response;
    }

        //testRoot($user);
        //testHomeEnglish($user);
        //testHomeFrench($user);
        //testFAQEnglish($user);
        //testFAQFrench($user);
}
