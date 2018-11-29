<?php

namespace Tests\Feature;

use Tests\TestCase;

class GrantleyTest extends TestCase {

    public function testDatabase() {

        $this->assertDatabaseHas('users', [
            'email' => 'grant.d.barnes@gmail.com'
        ]);
    }
}
