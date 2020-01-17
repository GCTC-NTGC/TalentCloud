<?php

namespace Tests\Unit;

use App\Models\Comment;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Lang;
use Jenssegers\Date\Date;

use App\Models\JobPoster;

class JobPosterTest extends TestCase
{
    use WithFaker;
    use RefreshDatabase;

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

        $jobPoster = factory(JobPoster::class)->states('draft')->make();
        $this->assertFalse($jobPoster->isOpen());
    }

    /**
     * Test that JobPoster->isClosed() behaves properly
     *
     * @return void
     */
    public function testJobPosterIsClosed() : void
    {
        $jobPoster = factory(JobPoster::class)->states('published')->make();
        $this->assertFalse($jobPoster->isClosed());

        $jobPoster->close_date_time = $this->faker->dateTimeBetween('-1 weeks', '-5 minutes');
        $this->assertTrue($jobPoster->isClosed());

        $jobPoster = factory(JobPoster::class)->states('draft')->make();
        $this->assertFalse($jobPoster->isClosed());
    }

    /**
     * Test that JobPoster->status() behaves properly
     *
     * @return void
     */
    public function testJobPosterStatus() : void
    {
        $jobPoster = factory(JobPoster::class)->states('draft')->make();
        $this->assertEquals('draft', $jobPoster->status());

        $jobPoster = factory(JobPoster::class)->states('published')->make();
        $this->assertEquals('published', $jobPoster->status());

        $jobPoster = factory(JobPoster::class)->states('closed')->make();
        $this->assertEquals('closed', $jobPoster->status());

        $jobPoster = factory(JobPoster::class)->states('review_requested')->make();
        $this->assertEquals('submitted', $jobPoster->status());
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

    /**
     * Ensure the published mutator functions correctly.
     *
     * @return void
     */
    public function testJobPosterPublishedMutator() : void
    {
        // Open but not yet published.
        $jobPoster = factory(JobPoster::class)->make();
        $this->assertEquals(null, $jobPoster->published_at);

        $jobPoster->published = true;
        $jobPoster->save();
        $jobPoster->refresh();

        $this->assertInstanceOf(Date::class, $jobPoster->published_at);

        $this->assertNotEquals($jobPoster->open_date_time, $jobPoster->published_at);

        // Not yet open and not yet published.
        $jobPoster = factory(JobPoster::class)->states('review_requested')->make();
        $this->assertEquals(null, $jobPoster->published_at);

        $jobPoster->published = true;
        $jobPoster->save();
        $jobPoster->refresh();

        $this->assertInstanceOf(Date::class, $jobPoster->published_at);
    }

    /**
     * Test one-to-many relationship between Job Poster and comments
     *
     * @return void
     */
    public function testJobPosterHasManyComments()
    {
        $job_poster = factory(JobPoster::class)->create();
        $comment = factory(Comment::class)->make(['job_poster_id' => $job_poster->id]);

        $this->assertInstanceOf('Illuminate\Database\Eloquent\Collection', $job_poster->comments);
    }
}
