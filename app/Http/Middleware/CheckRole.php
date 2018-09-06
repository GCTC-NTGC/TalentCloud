<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Barryvdh\Debugbar\Facade as Debugbar;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
        //If user logged in as admin, always pass, regardless of $role
        if (Auth::check() && Auth::user()->user_role->name == 'admin') {
            Debugbar::info('CheckRole Bypassed as Admin');
            return $next($request);
        }

        //Redirect if not logged in, or if not the correct role
        if (Auth::guest() || Auth::user()->user_role->name != $role) {
            Debugbar::info('CheckRole Failed');
            //TODO: redirect to some sort of error messag
            if ($role == 'manager') {
                return redirect(route('manager.home'));
            } else {
                return redirect(route('home'));
            }
        }
        Debugbar::info('CheckRole Passed');
        return $next($request);
    }
}
