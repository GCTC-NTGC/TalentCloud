<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class BrowseApplicantPagesTest extends DuskTestCase
{
    /**
     * A basic browser test example.
     *
     * @return void
     */
    public function testEnglishApplicantPages()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                    ->assertSee('GC Talent Cloud');

            $browser->clickLink('Browse Jobs')
                    ->assertSee('Browse Jobs');

            $browser->clickLink('FAQ')
                    ->assertSee('Talent Cloud User Guide');

            $browser->clickLink('Login')
                    ->assertSee('Login to Talent Cloud');

            $browser->clickLink('Register')
                    ->assertSee('Register for Talent Cloud');
        });
    }

    public function testFrenchApplicantPages()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                    ->assertSee('GC Talent Cloud');

            $browser->clickLink('Français')
                    ->assertSee('Nuage de talents du GC');

            $browser->clickLink('Parcourir les emplois')
                    ->assertSee('Parcourir les emplois');

            $browser->clickLink('FAQ')
                    ->assertSee('Nuage de talents : mode d\'emploi');

            $browser->clickLink('Ouverture de session')
                    ->assertSee('Overture de session pour le Nuage de talents');

            $browser->clickLink('Inscription')
                    ->assertSee('Inscrivez-vous pour le Nuage de talents');
        });
    }
}
