<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

use App\Models\JobPoster;
use App\Models\User;

class JobPosterReviewRequested extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     *
     * @var integer
     */
    public $tries = 5;

    /**
     * The Job Poster instance.
     *
     * @var JobPoster
     */
    public $jobPoster;

    /**
     * The Manager that owns the Job Poster.
     *
     * @var User
     */
    public $manager;

    /**
     * Create a new message instance.
     *
     * @param JobPoster $jobPoster Incoming Job Poster object.
     * @param User      $manager   Incoming User object.
     *
     * @return void
     */
    public function __construct(JobPoster $jobPoster, User $manager)
    {
        $this->jobPoster = $jobPoster;
        $this->manager = $manager;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->text('emails.job_posters.review_requested_plain');
    }
}
