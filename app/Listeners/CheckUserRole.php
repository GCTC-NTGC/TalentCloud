<?php

namespace App\Listeners;

use App\Events\UserUpdated;
use App\Models\Manager;

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
            $managerProfile = Manager::where('user_id', $event->user->id)->first();
            if ($managerProfile === null) {
                $managerProfile = new Manager();
                $managerProfile->user_id = $event->user->id;
                $managerProfile->save();
            }
        }
    }
}
