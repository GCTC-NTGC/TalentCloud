<?php

namespace Tests\Unit\Helpers;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Jenssegers\Date\Date;

class HelperTest extends TestCase
{
    /**
     * Run parent setup and set some values for use across tests.
     *
     * @return void
     */
    protected function setUp() : void
    {
        parent::setUp();

        $this->timezone = config('app.local_timezone');
        $this->dateFormat = config('app.date_format')['en'];
        $this->timeFormat = config('app.time_format')['en'];
    }

    /**
     * Test that humanizeDateDiff functions correctly.
     *
     * @return void
     */
    public function testHumanizeDateDiff() : void
    {
        $dateToTest = Date::parse('+5 days +1 hour');
        $diff = humanizeDateDiff($dateToTest);
        $this->assertEquals('5 Days', $diff);

        $dateToTest = Date::parse('-32 minutes');
        $diff = humanizeDateDiff($dateToTest);
        $this->assertEquals('32 Minutes', $diff);

        $dateToTest = Date::parse('10 hours');
        $reference = Date::parse('23 hours');
        $diff = humanizeDateDiff($dateToTest, $reference);
        $this->assertEquals('13 Hours', $diff);

        /**  Test to show now negative time difference is rounded down, 12:59:59 is being rounded to 12 Hours */
        $dateToTest = Date::parse('10 hours');
        $reference = Date::parse('-3 hours');
        $diff = humanizeDateDiff($dateToTest, $reference);
        $this->assertEquals('12 Hours', $diff);
    }

    /**
     * Test that humanizeDate functions correctly.
     *
     * @return void
     */
    public function testHumanizeDate() : void
    {
        $dateToTest = Date::parse('2019-01-01');
        $dateToTest->setTimezone($this->timezone);

        $expected = $dateToTest->format($this->dateFormat);

        $this->assertEquals($expected, humanizeDate($dateToTest));
    }

    /**
     * Test that humanizeTime functions correctly.
     *
     * @return void
     */
    public function testHumanizeTime() : void
    {
        $timeToTest = Date::parse('2019-01-01 17:00:00');
        $timeToTest->setTimezone($this->timezone);

        $expected = $timeToTest->format($this->timeFormat);

        $this->assertEquals($expected, humanizeTime($timeToTest));
    }

    /**
     * Test that humanizeLastDay functions correctly.
     *
     * Job closing dates are set to midnight PST. 8:00:00 UTC
     *
     * @return void
     */
    public function testHumanizeLastDay() : void
    {
        $dateToTest = Date::parse('2019-01-05 8:00:00');
        $dateToTest->setTimezone($this->timezone);

        $expected = Date::parse('2019-01-04 8:00:00');
        $expected->setTimezone($this->timezone);
        $expected = $expected->format($this->dateFormat);

        $this->assertEquals($expected, humanizeLastDay($dateToTest));
    }
}
