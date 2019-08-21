<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
        // If user logged in as admin, always pass, regardless of $role
        if (Auth::check() && Auth::user()->isAdmin()) {
            Log::info('CheckRole Bypassed as Admin');
            return $next($request);
        }

        // Redirect if not logged in, or if not the correct role
        if (Auth::guest() || !Auth::user()->hasRole($role)) {
            Log::info('CheckRole Failed');
            // TODO: redirect to some sort of error messag
            if (Auth::check() && Auth::user()->isManager()) {
                return redirect(route('manager.home'));
            } else {
                return redirect(route('home'));
            }
        }
        return $next($request);
    }
}
