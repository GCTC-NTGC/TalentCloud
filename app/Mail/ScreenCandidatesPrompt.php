<?php

namespace App\Mail;

use App\Models\JobPoster;
use App\Models\Lookup\CitizenshipDeclaration;
use App\Models\Lookup\VeteranStatus;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class ScreenCandidatesPrompt extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * The Job Poster instance.
     *
     * @var JobPoster
     */
    public $job;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(JobPoster $job)
    {
        $this->job = $job;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        // Get emails of all Hr Advisors who have claimed job.
        $hr_advisors_emails = [];
        $hr_advisors = $this->job->hr_advisors;

        foreach ($hr_advisors as $advisor) {
            $email = User::where('id', $advisor->user_id)->first()->email;
            array_push($hr_advisors_emails, $email);
        }

        // Get date 2 weeks after job poster closes.
        $dateFormat = Config::get('app.date_format');
        $locale = App::getLocale();
        $timestamp_in_two_weeks = strtotime('+2 weeks', $this->job->close_date_time->timestamp);
        $date_in_two_weeks = date($dateFormat[$locale], $timestamp_in_two_weeks);

        // Number of applicants.
        $num_of_applicants = $this->job->job_applications->count();

        // Number of non-citizens.
        $canadian_citizen = CitizenshipDeclaration::where('name', 'citizen')->first()->id;
        $num_of_noncitizens = $this->job->job_applications
                                ->where('citizenship_declaration_id', '!=', $canadian_citizen)
                                ->count();

        // Number of veterans.
        $non_veteran = VeteranStatus::where('name', 'none')->first()->id;
        $num_of_veterans = $this->job->job_applications
                            ->where('veteran_status_id', '!=', $non_veteran)
                            ->count();

        $position = $this->job->getTranslations('title');
        $classification = $this->job->getClassificationMessageAttribute();
        $subject = Lang::get('common/notifications/screen_candidates.subject', [ 'position' => $position['en'], 'classification' => $classification ]) . ' / ' . Lang::get('common/notifications/screen_candidates.subject', [ 'position' => $position['fr'], 'classification' => $classification ], 'fr');

        return $this->subject($subject)
                    ->cc($hr_advisors_emails)
                    ->markdown('emails.job_posters.screen_candidates_plain', [
                        'drop_off_date' => $date_in_two_weeks,
                        'manager_portal_link' => [
                            'en' => route('manager.home'),
                            'fr' => LaravelLocalization::getLocalizedURL('fr', route('manager.home')),
                        ],
                        'num_of_applicants' => $num_of_applicants,
                        'num_of_noncitizens' => $num_of_noncitizens,
                        'num_of_veterans' => $num_of_veterans,
                        'position' => $position,
                        'position_link' => [
                            'en' => route('jobs.show', $this->job->id),
                            'fr' => LaravelLocalization::getLocalizedURL('fr', route('jobs.show', $this->job->id)),
                        ],
                        'talent_cloud_email' => config('mail.admin_address'),
                    ]);
    }
}
