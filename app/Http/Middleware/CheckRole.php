<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

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
        //Redirect if not logged in, or if not the correct role
        if (Auth::guest() || Auth::user()->user_role->name != $role) {
            //TODO: redirect to some sort of error messag
            if ($role == 'manager') {
                return redirect(route('manager.home'));
            } else {
                return redirect(route('home'));
            }
        }
        return $next($request);
    }
}
