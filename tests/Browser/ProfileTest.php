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

        // Register with factory credentials
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
                    ->assertSee('About Me');

            // Go to My Experience, open accordion
            $browser->clickLink('My Experience')
                    ->assertSee('My Experience')
                    ->press('Add Diploma/Degree')
                    ->assertSee('New Diploma/Degree');

            // Add a diploma
            $browser->select('#degrees\5b new\5d \5b 1\5d degreeType', '4')
                    ->type('#degrees\5b new\5d \5b 1\5d degreeArea', 'Test area of study')
                    ->type('#degrees\5b new\5d \5b 1\5d degreeInstitution', 'Test institution');
                    // TODO: Selectors for date picker
                    //->click('#degrees\5b new\5d \5b 1\5d degreeStartDate')
                    //->type('#degrees\5b new\5d \5b 1\5d degreeStartDate', ['2017'], ['{tab}'], ['0717']);
                    //->type('#degrees\5b new\5d \5b 1\5d degreeEndDate', '2018', ['{tab}'], '08', ['{tab}'], '18');

            // Saved work sample name should be visible
            $browser->assertSee('Save Diploma/Degree')
                    ->pause(777) // Fails without a short pause
                    ->press('Save Diploma/Degree')
                    ->assertSee('Phd, Test area of study');

            // TODO: Repeat for certification / equivalent experience
            //$browser->press('Add Course/Certification')
            //        ->assertSee('New Course/Certification');

            // Go to My Skills page
            $browser->clickLink('My Skills')
                    ->assertSee('My Skills')
                    ->press('Add Skill')
                    ->assertSee('New Skill');

            // Add a soft skill
            $browser->select('#skill_declarations\5b new\5d \5b soft\5d \5b 1\5d skillSelection', '24') // Select dropdown by value
                    ->keys('#skill_declarations\5b new\5d \5b soft\5d \5b 1\5d skillSelection',
                        ['{tab}'], ['{tab}'], ['{arrow_right}']) // Keyboard controls were necessary to select skill level properly
                    ->type('#skill_declarations\5b new\5d \5b soft\5d \5b 1\5d skillDescription', 'Test skill description');

            $browser->script('window.scrollTo(0, 1000);');

            // Text corresponding to skill selection value should be visible
            $browser->assertSee('Save Skill')
                    ->pause(777)
                    ->press('Save Skill')
                    ->assertSee('Passion');

            // TODO: Repeat for hard skill

            // Go to My References, open accordion
            $browser->clickLink('My References')
                    ->assertSee('My References')
                    ->press('Add Reference')
                    ->assertSee('New Reference');

            // Add a reference
            $browser->type('#references\5b new\5d \5b 1\5d referenceName', 'Test Reference')
                    ->select('#references\5b new\5d \5b 1\5d referenceRelationship') // Selects random if not specified
                    ->type('#references\5b new\5d \5b 1\5d referenceEmail', 'grant.d.barnes@gmail.com')
                    ->type('#references\5b new\5d \5b 1\5d referenceDescription', 'Test reference description');

            // Scroll down (button click will fail if not visible on test browser screen)
            $browser->script('window.scrollTo(0, 1000);');

            // Saved work sample name should be visible
            $browser->assertSee('Save Reference')
                    ->pause(777) // Fails without a short pause
                    ->press('Save Reference')
                    ->assertSee('Test Reference');

            // Go to My Work Samples, open accordion
            $browser->clickLink('My Work Samples')
                    ->assertSee('My Work Samples')
                    ->press('Add Sample')
                    ->assertSee('New Work Sample');

            // Add work sample data, wouln't work without copying the full selector
            $browser->type('#work_samples\5b new\5d \5b 1\5d sampleName', 'Test Sample')
                    ->select('#work_samples\5b new\5d \5b 1\5d sampleType') // Selects random if not specified
                    ->type('#work_samples\5b new\5d \5b 1\5d sampleLink', 'http://talent.canada.ca')
                    ->type('#work_samples\5b new\5d \5b 1\5d sampleDescription', 'Test sample description');

            $browser->script('window.scrollTo(0, 1000);');

            // Saved work sample name should be visible
            $browser->assertSee('Save Sample')
                    ->pause(777) // Fails without a short pause
                    ->press('Save Sample')
                    ->assertSee('Test Sample');

        });
    }
}
