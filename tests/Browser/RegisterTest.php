<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class RegisterTest extends DuskTestCase {

    public function testRegister() {
        
        // User with name / email / password, not saved to database
        $user = factory(\App\Models\User::class)->make();

        // Register with factory credentials, save database record
        $this->browse(function ($browser) use ($user) {
            $browser->visit('/register')
                    ->type('name', $user->name)
                    ->type('email', $user->email)
                    ->type('password', $user->password)
                    ->type('password_confirmation', $user->password)
                    ->press('Register');

            // Should be able to see My Profile after authentication
            $browser->assertSee('My Profile')
                    ->assertPathIs('/en');


            // After logout, shouldn't be able to see My Profile
            $browser->clickLink('Logout')
                    ->assertDontSee('My Profile')
                    ->assertPathIs('/en');


            // Log back in with same credentials
            $browser->clickLink('Login')
                    ->type('email', $user->email)
                    ->type('password', $user->password)
                    ->press('Login');

            // Go to profile
            $browser->assertSee('My Profile')
                    ->clickLink('My Profile')
                    ->assertSee('About Me'); // Had trouble passing user ID to URL
        });
    }
}
