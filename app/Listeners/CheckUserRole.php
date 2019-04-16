<?php

namespace App\Listeners;

use App\Events\UserUpdated;
use App\Models\Manager;
use Illuminate\Support\Facades\Log;

class CheckUserRole
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
     * Create a manager object for a User if one does not exist.
     *
     * @param UserUpdated $event Fires after successful database update.
     * @return void
     */
    public function handle(UserUpdated $event) : void
    {
        if ($event->user->hasRole('manager') ||
            $event->user->hasRole('admin')
        ) {
            $managerProfile = $event->user->manager;
            Log::notice("User " . $event->user->id . " manager account: " . $event->user->manager);
            if ($managerProfile === null) {
                $managerProfile = new Manager();
                $managerProfile->user_id = $event->user->id;
                $managerProfile->save();
            }
        }
    }
}
