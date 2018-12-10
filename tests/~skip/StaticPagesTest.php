<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class StaticPagesTest extends DuskTestCase
{
    /**
     * A basic browser test example.
     *
     * @return void
     */
    public function testStaticPages()
    {
        $this->browse(function (Browser $browser) {

            // Basic browser page tests, unauthenticated user
            $browser->visit('/')
                    ->assertSee('GC Talent Cloud')
                    ->assertDontSee('Oprah Winfrey Network');

            $browser->clickLink('Français')
                    ->assertSee('Nuage de talents du GC')
                    ->assertPathIs('/fr');

            $browser->clickLink('English')
                    ->assertSee('GC Talent Cloud')
                    ->assertDontSee('Job Mountain')
                    ->assertPathIs('/en');

            $browser->clickLink('FAQ')
                    ->assertSee('Talent Cloud User Guide')
                    ->assertPathIs('/en/faq');

            $browser->clickLink('Français')
                    ->assertSee('Nuage de talents : mode d\'emploi')
                    ->assertPathIs('/fr/faq');

            // Move to job application test
            $browser->clickLink('Parcourir les emplois')
                    ->assertSee('Parcourir les emplois')
                    ->assertPathIs('/fr/jobs');

            $browser->clickLink('English')
                    ->assertSee('Browse Jobs')
                    ->assertPathIs('/en/jobs');

        });
    }
}
