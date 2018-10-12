<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class LogSuccessfulLogin
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
     * Handle the Login event.
     * Note: the Login event is fired in Illuminate\Auth\SessionGuard.
     *
     * @param  Login  $event
     * @return void
     */
    public function handle(Login $event)
    {
        Log::notice("Login by user {id=".$event->user->id.", email=".$event->user->email.", role=".$event->user->user_role->name."}");
    }
}
