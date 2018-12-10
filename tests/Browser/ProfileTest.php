<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ProfileTest extends DuskTestCase {

    public function testFillProfile() {

        // User with name / email / password, not saved to database
        $user = factory(\App\Models\User::class)->make();

        // Register with factory credentials, save database record
        $this->browse(function ($browser) use ($user) {
            $browser->visit('/register')
                    ->type('name', $user->name)
                    ->type('email', $user->email)
                    ->type('password', $user->password)
                    ->type('password_confirmation', $user->password)
                    ->press('Register')
                    // Should be able to see My Profile after authentication
                    ->assertSee('My Profile');

            // Go to profile
            $browser->clickLink('My Profile')
                    ->assertSee('About Me')
                    // Go to work samples, add one
                    ->clickLink('My Work Samples')
                    ->press('Add Sample')
                    ->assertSee('New Work Sample')
                    ->type('sampleName', 'abcdefg');
        });
    }
}
//http://www.linkedin.com/in/grantbarnes
