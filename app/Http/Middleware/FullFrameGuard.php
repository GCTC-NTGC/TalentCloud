<?php
namespace App\Http\Middleware;

use Closure;

class FullFrameGuard
{
    /**
     * Set X-FRAME-OPTIONS header to DENY
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {

        $response = $next($request);

        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');

        return $response;
    }
}
