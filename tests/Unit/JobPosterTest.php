<?php

namespace Tests\Unit;

use App\Models\Comment;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Lang;
use Jenssegers\Date\Date;

use App\Models\JobPoster;
use App\Models\Lookup\JobPosterStatus;

class JobPosterTest extends TestCase
{
    use WithFaker;
    use RefreshDatabase;

    /**
     * Test that JobPoster->isOpen() behaves properly
     *
     * @return void
     */
    public function testJobPosterIsOpen(): void
    {
        $jobPoster = factory(JobPoster::class)->states('live')->create();
        $this->assertTrue($jobPoster->isOpen());

        $jobPoster->job_poster_status_id = JobPosterStatus::where('key', 'assessment')->first()->id;
        $jobPoster->save();
        $this->assertFalse($jobPoster->fresh()->isOpen());

        $jobPoster = factory(JobPoster::class)->states('draft')->create();
        $this->assertFalse($jobPoster->isOpen());
    }

    /**
     * Test that JobPoster->isClosed() behaves properly
     *
     * @return void
     */
    public function testJobPosterIsClosed(): void
    {
        $jobPoster = factory(JobPoster::class)->states('live')->create();
        $this->assertFalse($jobPoster->isClosed());

        $jobPoster->job_poster_status_id = JobPosterStatus::where('key', 'assessment')->first()->id;
        $jobPoster->save();
        $this->assertTrue($jobPoster->fresh()->isClosed());

        $jobPoster = factory(JobPoster::class)->states('draft')->create();
        $this->assertFalse($jobPoster->fresh()->isClosed());
    }

    /**
     * Test that JobPoster->timeRemaining() behaves properly
     *
     * @return void
     */
    public function testJobPosterTimeRemaining(): void
    {
        $jobPoster = factory(JobPoster::class)->create(
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
    public function testJobPosterApplyBy(): void
    {
        $jobPoster = factory(JobPoster::class)->create();
        $date = new Date($jobPoster->close_date_time);
        $date->setTimezone(JobPoster::TIMEZONE);
        $this->assertEquals(
            $date->format(JobPoster::DATE_FORMAT['en']) . $date->format(JobPoster::TIME_FORMAT['en']),
            $jobPoster->applyBy()['date'] . $jobPoster->applyBy()['time']
        );
    }
    /**
     * Test one-to-many relationship between Job Poster and comments
     *
     * @return void
     */
    public function testJobPosterHasManyComments()
    {
        $job_poster = factory(JobPoster::class)->create();
        $comment = factory(Comment::class)->create(['job_poster_id' => $job_poster->id]);

        $this->assertInstanceOf('Illuminate\Database\Eloquent\Collection', $job_poster->comments);
    }
}
