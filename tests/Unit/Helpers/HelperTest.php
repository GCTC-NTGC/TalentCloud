<?php

namespace Tests\Unit\Helpers;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Jenssegers\Date\Date;

class HelperTest extends TestCase
{
    /**
     * Test that the humanizeDateDiff functions correctly.
     *
     * @return void
     */
    public function testHumanizeDateDiff() : void
    {
        $dateToTest = Date::parse('+5 days');
        $diff = humanizeDateDiff($dateToTest);
        $this->assertEquals('5 Days', $diff);

        $dateToTest = Date::parse('-32 minutes');
        $diff = humanizeDateDiff($dateToTest);
        $this->assertEquals('32 Minutes', $diff);

        $dateToTest = Date::parse('-10 hours');
        $reference = Date::parse('-23 hours');
        $diff = humanizeDateDiff($dateToTest, $reference);
        $this->assertEquals('13 Hours', $diff);
    }
}
