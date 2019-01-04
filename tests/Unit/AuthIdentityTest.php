<?php

namespace Tests\Unit;

use App\Services\Auth;

class JobPolicyTest extends BasePolicyTest {

    public function testAuthIdentifier()
    {
        //TODO: write a real test
        //$authIdentity = factory(\App\Models\User::class)->make();

        $this->assertDatabaseMissing('users', [
            'email' => 'oprah@oprah.com'
        ]);

        $this->assertEquals('123','123');
    }
}
