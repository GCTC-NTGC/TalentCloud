<?php

namespace Tests;

use Laravel\Dusk\TestCase as BaseTestCase;
use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Laravel\Dusk\Browser;

abstract class DuskTestCase extends BaseTestCase
{
    use CreatesApplication;

    /**
     * Prepare for Dusk test execution.
     *
     * @beforeClass
     * @return void
     */
    public static function prepare()
    {
        static::startChromeDriver();

        // Use scrollTo macro if element is off the browser screen
        // Example: clicking a button that's below the visible content will eroor
        Browser::macro('scrollTo', function($selector) {
            $this->driver->executeScript("$(\"html, body\").animate({scrollTop: $(\"$selector\").offset().top}, 0);");
            return $this;
        });
    }

    /**
     * Create the RemoteWebDriver instance.
     *
     * @return \Facebook\WebDriver\Remote\RemoteWebDriver
     */
    protected function driver()
    {
        $options = (new ChromeOptions)->addArguments([
            '--disable-gpu',
            '--headless'
        ]);

        // Run tests inside Docker container
        switch (config('dusk.driver')) {
        case 'container':
            return RemoteWebDriver::create(
                'http://localhost:4444/wd/hub', DesiredCapabilities::chrome()
            );
        default: // local
            return RemoteWebDriver::create(
                'http://localhost:9515', DesiredCapabilities::chrome()
            );
        }
    }
}
