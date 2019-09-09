<?php

namespace App\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Log;

class BasePolicy
{
    use HandlesAuthorization;

    public function before($user, $ability)
    {
        if ($user->isAdmin()) {
            $userText = '{id='.$user->id.'}';
            Log::notice('User '.$userText.' has bypassed policy as an Admin');
            return true;
        }
    }
}
