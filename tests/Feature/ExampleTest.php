<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;


class ExampleTest extends TestCase {

    use WithoutMiddleware;


    /**
     * A basic test example.
     *
     * @return void
     */

    public function testBasicTest() {
        $response = $this->get('/');
        $response->assertStatus(200);

    }
}
