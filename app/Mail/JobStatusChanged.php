<?php

namespace App\Mail;

use App\Models\JobPosterStatusHistory;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class JobStatusChanged extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * The job status transition which caused this notification.
     *
     * @var JobPosterStatusHistory
     */
    protected $transition;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(JobPosterStatusHistory $transition)
    {
        $this->transition = $transition;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $job = $this->transition->job_poster;
        $to = $this->transition->to->name;
        $subject = "Job $job->title changed status to $to";
        return $this->markdown('emails.job_posters.status_transition')
            ->subject($subject)
            ->with([
                'jobPoster' => $this->transition->job_poster,
                'user' => $this->transition->user,
                'from' => $this->transition->from->name,
                'to' => $to,
                'url' => backpack_url('job-poster'),
            ]);
    }
}
