<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class RegisterTest extends DuskTestCase
{
    public function makeUser() {
        $user = factory(\App\Models\User::class)->make();
        return $user;
    }

    public function testRegisterUser()
    {
        $user = $this->makeUser();

        $this->browse(function ($browser) use ($user) {
            $browser->visit('/register')
                    ->type('name', $user->name)
                    ->type('email', $user->email)
                    ->type('password', $user->password)
                    ->type('password_confirmation', $user->password)
                    ->press('Register');

            $browser->assertSee('GC Talent Cloud')
                    ->assertPathIs('/en');

        });
    }
}
