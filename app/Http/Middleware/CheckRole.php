<?php

namespace App\Http\Middleware;

use Closure;
use Facades\App\Services\WhichPortal;
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
        // If user logged in as admin, always pass, regardless of $role.
        if (Auth::check() && Auth::user()->isAdmin()) {
            return $next($request);
        }

        // Redirect if not logged in, or if not the correct role.
        if (Auth::guest() || !Auth::user()->hasRole($role)) {
            // TODO: redirect to some sort of error message.
            if (WhichPortal::isManagerPortal()) {
                return redirect(route('manager.home'));
            } elseif (WhichPortal::isHrPortal()) {
                return redirect(route('hr_advisor.home'));
            } else {
                return redirect(route('home'));
            }
        }
        return $next($request);
    }
}
