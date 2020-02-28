<?php

namespace App\Listeners;

use App\Events\JobSaved;
use App\Mail\ScreenCandidatesPrompt;
use App\Models\HrAdvisor;
use App\Models\Lookup\CitizenshipDeclaration;
use App\Models\Lookup\VeteranStatus;
use App\Models\User;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendScreenCandidatesEmail implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Sends email to managers, prompting to start screening applicants.
     *
     * @return void
     */
    public function screenCandidatesPrompt($job) // phpcs:ignore
    {
        // Get emails of all Hr Advisors who have claimed job
        $hr_advisors_emails = [];
        $hr_advisors = $job->hr_advisors;

        foreach ($hr_advisors as $advisor) {
            $email = User::where('id', $advisor->user_id)->first()->email;
            array_push($hr_advisors_emails, $email);
        }

        // Get date 2 weeks after job poster closes
        $dateFormat = Config::get('app.date_format');
        $locale = App::getLocale();
        $timestamp_in_two_weeks = strtotime('+2 weeks', $job->close_date_time->timestamp);
        $date_in_two_weeks = date($dateFormat[$locale], $timestamp_in_two_weeks);

        // Number of applicants
        $num_of_applicants = $job->job_applications->count();

        // Number of non-citizens
        $canadian_citizen = CitizenshipDeclaration::where('name', 'citizen')->first()->id;
        $num_of_noncitizens = $job->job_applications
                                ->where('citizenship_declaration_id', '!=', $canadian_citizen)
                                ->count();

        // Number of veterans
        $non_veteran = VeteranStatus::where('name', 'none')->first()->id;
        $num_of_veterans = $job->job_applications
                            ->where('veteran_status_id', '!=', $non_veteran)
                            ->count();

        // Create array of data needed for ScreeningCandidatesPrompt mailable
        $mailData = [
            'classification' => $job->getClassificationMessageAttribute(),
            'drop_off_date' => $date_in_two_weeks,
            'hr_advisors_emails' => $hr_advisors_emails,
            'manager_portal_link' => [
                'en' => route('manager.home'),
                'fr' => route('manager.home'),
            ],
            'num_of_applicants' => $num_of_applicants,
            'num_of_noncitizens' => $num_of_noncitizens,
            'num_of_veterans' => $num_of_veterans,
            'position' => $job->getTranslations('title'),
            'position_link' => [
                'en' => route('jobs.show', $job),
                'fr' => route('jobs.show', $job),
            ],
            'talent_cloud_email' => 'Talent.Cloud-nuage.de.talents@tbs-sct.gc.ca',
        ];

        $manager_email = $job->manager->user->email;
        if (isset($manager_email)) {
            Mail::to($manager_email)->send(new ScreenCandidatesPrompt($mailData));
        } else {
            Log::error('The screen applicants email to manager has not been set.');
        }
    }

    /**
     * Handle the event.
     *
     * @param  JobSaved  $event
     * @return void
     */
    public function handle(JobSaved $event)
    {
        $job = $event->job;

        $this->screenCandidatesPrompt($job);
    }
}
