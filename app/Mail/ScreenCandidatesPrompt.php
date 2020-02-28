<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;

class ScreenCandidatesPrompt extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * The Job Poster instance.
     *
     * @var array
     */
    public $data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $position = $this->data['position'];
        $classification = $this->data['classification'];
        $subject = Lang::get('common/notifications/screen_candidates.subject', [ 'position' => $position['en'], 'classification' => $classification ]) . '/ ' . Lang::get('common/notifications/screen_candidates.subject', [ 'position' => $position['en'], 'classification' => $classification ]);

        return $this->subject($subject)
                    ->cc($this->data['hr_advisors_emails'])
                    ->markdown('emails.job_posters.screen_candidates_plain', $this->data);
    }
}
