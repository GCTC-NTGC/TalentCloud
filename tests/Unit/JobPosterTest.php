<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Lang;
use Jenssegers\Date\Date;

use App\Models\JobPoster;
use Doctrine\Common\Cache\VoidCache;

class JobPosterTest extends TestCase
{
    use WithFaker;

    /**
     * Test that JobPoster->isOpen() behaves properly
     *
     * @return void
     */
    public function testJobPosterIsOpen() : void
    {
        $jobPoster = factory(JobPoster::class)->states('published')->make();
        $this->assertTrue($jobPoster->isOpen());

        $jobPoster->close_date_time = $this->faker->dateTimeBetween('-1 weeks', 'now');
        $this->assertFalse($jobPoster->isOpen());

        $jobPoster = factory(JobPoster::class)->states('unpublished')->make();
        $this->assertFalse($jobPoster->isOpen());
    }

    /**
     * Test that JobPoster->timeRemaining() behaves properly
     *
     * @return void
     */
    public function testJobPosterTimeRemaining() : void
    {
        $jobPoster = factory(JobPoster::class)->make(
            [
                'close_date_time' => date('Y-m-d H:i:s', strtotime('-1 hour'))
            ]
        );
        $this->assertEquals(Lang::choice('common/time.hour', 1), $jobPoster->timeRemaining());

        $jobPoster->close_date_time = date('Y-m-d H:i:s', strtotime('-2 days'));
        $langString = Lang::choice('common/time.day', 2);
        $this->assertEquals($langString, $jobPoster->timeRemaining());

        $jobPoster->close_date_time = date('Y-m-d H:i:s', strtotime('-5 minutes'));
        $langString = Lang::choice('common/time.minute', 5);
        $this->assertEquals($langString, $jobPoster->timeRemaining());

        $jobPoster->close_date_time = date('Y-m-d H:i:s', strtotime('-30 seconds'));
        $langString = Lang::choice('common/time.second', 30);
        $this->assertEquals($langString, $jobPoster->timeRemaining());
    }

    /**
     * Test that JobPoster->applyBy() behaves properly
     *
     * @return void
     */
    public function testJobPosterApplyBy() : void
    {
        $jobPoster = factory(JobPoster::class)->make();
        $date = new Date($jobPoster->close_date_time);
        $date->setTimezone(JobPoster::TIMEZONE);
        $this->assertEquals(
            $date->format(JobPoster::DATE_FORMAT['en']) . $date->format(JobPoster::TIME_FORMAT['en']),
            $jobPoster->applyBy()['date'] . $jobPoster->applyBy()['time']
        );
    }
}
