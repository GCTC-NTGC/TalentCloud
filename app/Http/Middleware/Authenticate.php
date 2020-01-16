<?php
namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Facades\App\Services\WhichPortal;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    protected function redirectTo($request)
    {
        if (WhichPortal::isManagerPortal()) {
            return route('manager.login');
        } elseif (WhichPortal::isHrPortal()) {
            return route('hr_advisor.login');
        } else {
            return route('login');
        }
    }
}
