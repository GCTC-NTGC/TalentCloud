<?php

namespace App\Listeners;

use App\Events\ApplicationRetrieved;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class LogApplicationRetrieved
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
     * Handle the event.
     *
     * @param  AppliationRetrieved  $event
     * @return void
     */
    public function handle(ApplicationRetrieved $event)
    {
        $application = $event->application;

        if (Auth::check()) {
            $user = Auth::user();

            // Don't bother logging when an applicant views their own application
            if ($application->applicant->user->id != $user->id) {
                $applicationText = "{id=$application->id}";
                $userText = "{id=$user->id, email=$user->email}";
                Log::notice("Application viewed: application $applicationText viewed by user $userText.");
            }
        } else {
            $applicationText = "{id=$application->id}";
            Log::notice("Application retrieved: application $applicationText retrieved with no user logged in.");
        }
    }
}
