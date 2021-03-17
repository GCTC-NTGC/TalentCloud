<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Failed;
use Illuminate\Support\Facades\Log;

class LogFailedLogin
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
     * Handle the Failed event.
     *
     * @param  Failed  $event
     * @return void
     */
    public function handle(Failed $event) : void
    {
        Log::notice('Login failed by email ' . $event->credentials['email']);
    }
}
