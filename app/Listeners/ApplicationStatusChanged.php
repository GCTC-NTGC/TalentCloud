<?php

namespace App\Listeners;

use App\Events\ApplicationSaved;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class ApplicationStatusChanged
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  ApplicationSaved  $event
     * @return void
     */
    public function handle(ApplicationSaved $event)
    {
        $application = $event->application;

        if (Auth::check()) {
            $user = Auth::user();
            $userText = "{id=" . $user->id . ", email=" . $user->email . "}";
        } else {
            $userText = "{null}";
        }

        //Log when application is first created
        if ($application->wasRecentlyCreated) {
            $applicationText = "{id=" . $application->id . ", status=" . $application->application_status->name . "}";

            Log::notice("Application created: application " . $applicationText . " has been created by user " . $userText);
        }
        //Log if application status has been changed
        else if ($application->application_status_id != $application->getOriginal('application_status_id')) {
            $freshApplication = $application->fresh();
            $applicationText = "{id=" . $freshApplication->id . "}";
            $statusText = "{" . $freshApplication->application_status->name . "}";

            Log::notice("Application status changed: application " . $applicationText . " has been changed to " . $statusText . " by user " . $userText);
        }
    }
}
