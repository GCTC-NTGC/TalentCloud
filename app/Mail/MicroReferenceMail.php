<?php

namespace App\Mail;

use App\Models\JobApplication;
use App\Traits\ApiMailable;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Lang;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

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
        $reference_email = $this->is_director
            ? $this->application->director_email
            : $this->application->reference_email;
        $reference_name = $this->is_director
            ? $this->application->director_name
            : $this->application->reference_name;
        $mail = $this->subject(Lang::get('manager/micro_reference_mail.subject'))
            ->from(config('mail.admin_address'), config('mail.from.name'))
            ->markdown('emails.micro_reference', [
                'reference_name' => $reference_name,
                'homepage_url' => route('home'),
                'homepage_url_fr' => LaravelLocalization::getLocalizedURL('fr', route('home')),
                'applicant_name' => $this->application->applicant->user->full_name,
                'is_director' => $this->is_director,
                'criteria' => $essential_criteria,
            ]);
        if (isset($reference_email)) {
            $mail->to($reference_email, $reference_name ?? null);
        }
        return $mail;
    }
}
