<?php

namespace App\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Barryvdh\Debugbar\Facade as Debugbar;

class BasePolicy
{
    use HandlesAuthorization;

    public function before($user, $ability)
    {
        if ($user->user_role->name == 'admin') {
            Debugbar::info('User has bypassed policy as Admin');
            return true;
        }
    }
}
