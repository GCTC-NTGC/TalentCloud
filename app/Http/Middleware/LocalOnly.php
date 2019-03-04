<?php

namespace App\Http\Middleware;

use Closure;

class LocalOnly
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (\App::environment('local')) {
            return $next($request);
        }
        abort(404);
    }
}
