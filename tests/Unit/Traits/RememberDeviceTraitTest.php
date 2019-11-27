<?php

namespace Tests\Unit\Traits;

use Tests\TestCase;
use App\Models\User;

class RememberDeviceTraitTest extends TestCase
{
    public function testItReturnsSameRememberTokenForString()
    {
        $user = new User;
        $user->setRememberDeviceToken('sample_token');
        $this->assertSame('sample_token', $user->getRememberDeviceToken());
    }

    public function testItReturnsStringAsRememberTokenWhenItWasSetToTrue()
    {
        $user = new User;
        $user->setRememberDeviceToken(true);
        $this->assertSame('1', $user->getRememberDeviceToken());
    }

    public function testItReturnsNullWhenRememberTokenNameWasSetToEmpty()
    {
        $user = new class extends User {
            public function getRememberDeviceTokenName()
            {
                return '';
            }
        };
        $user->setRememberDeviceToken(true);
        $this->assertNull($user->getRememberDeviceToken());
    }
}
