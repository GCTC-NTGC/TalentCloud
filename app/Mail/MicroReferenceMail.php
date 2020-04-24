<?php

namespace App\Mail;

use App\Models\JobApplication;
use App\Traits\ApiMailable;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class MicroReferenceMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels, ApiMailable;

    /**
     * The application for which we need to make a reference check.
     *
     * @var \App\Models\JobApplication
     */
    public $application;

    /**
     * If true, this is for the applicant's Director reference.
     * If false, this is for the applicant's secondary reference.
     *
     * @var boolean
     */
    public $is_director;



    public function __construct(JobApplication $application, bool $is_director)
    {
        $this->application = $application;
        $this->is_director = $is_director;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $essential_criteria = $this->application->job_poster->criteria->where('criteria_type.name', 'essential');
        return $this->subject('TODO') // TODO:
            ->from(config('mail.from.address'), config('mail.from.name'))
            ->to(config('mail.from.address'), 'WAITING FOR NAME') // TODO:
            ->markdown('emails.micro_reference', [
                'reference_name' => 'WAITING FOR FIELD', // TODO: waiting for new fields
                'homepage_url' => route('home'), // TODO: waiting for new route
                'applicant_name' => $this->application->applicant->user->full_name,
                'is_director' => $this->is_director,
                'criteria' => $essential_criteria,
            ]);
    }
}
