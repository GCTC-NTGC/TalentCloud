<?php

namespace App\Http\Middleware;

use Closure;
use Facades\App\Services\WhichPortal;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        debugbar()->debug('Guest redirected to (if admin) '. backpack_url(''));
        if (Auth::guard($guard)->check()) {
            if (Auth::user()->isAdmin()) {
                return redirect(backpack_url(''));
            } elseif (WhichPortal::isManagerPortal()) {
                return redirect(route('manager.home'));
            } else {
                return redirect(route('home'));
            }
        }

        return $next($request);
    }
}
