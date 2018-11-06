<?php

namespace App\Http\Middleware;

use Closure;
use Jenssegers\Date\Date;

class DateLocale
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
        Date::setLocale(app()->getLocale());
        
        return $next($request);
    }
}
