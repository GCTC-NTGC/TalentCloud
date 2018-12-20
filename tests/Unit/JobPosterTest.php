<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Lang;

use App\Models\JobPoster;

class JobPosterTest extends TestCase
{
    use WithFaker;

    /**
     * Test that JobPoster->isOpen() behaves properly
     *
     * @return void
     */
    public function testJobPosterIsOpen()
    {
        $jobPoster = factory(\App\Models\JobPoster::class)->make();
        $this->assertTrue($jobPoster->isOpen());

        $jobPoster->close_date_time = $this->faker->dateTimeBetween('-1 weeks', 'now');
        $this->assertFalse($jobPoster->isOpen());

        $jobPoster = factory(\App\Models\JobPoster::class)->make(
            [
                'published' => false
            ]
        );
        $this->assertFalse($jobPoster->isOpen());
    }

    /**
     * Test that JobPoster->timeRemaining() behaves properly
     *
     * @return void
     */
    public function testJobPosterTimeRemaining()
    {
        $jobPoster = factory(\App\Models\JobPoster::class)->make(
            [
                'close_date_time' => date('Y-m-d H:i:s', strtotime('-1 hour'))
            ]
        );
        $this->assertEquals(Lang::choice('common/time.hour', 1), $jobPoster->timeRemaining());

        $jobPoster = factory(\App\Models\JobPoster::class)->make(
            [
                'close_date_time' => date('Y-m-d H:i:s', strtotime('-2 days'))
            ]
        );
        $langString = Lang::choice('common/time.day', 2);
        $this->assertEquals($langString, $jobPoster->timeRemaining());
    }
}
