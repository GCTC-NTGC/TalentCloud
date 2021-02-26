<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LogAction
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
        if (Auth::check() && Auth::user()->isAdmin() && $request->method() !== 'GET') {
            parse_str($request->getContent(), $body);
            $bodyKeys = [];
            foreach ($body as $key => $value) {
                array_push($bodyKeys, $key); // Only include keys from request body to avoid logging any sensitive values.
            }
            $logArray = [
                'message' => 'Admin non-GET request',
                'admin_user_id' => $request->user()->id,
                'url' => $request->url(),
                'verb' => $request->method(),
                'body' => $bodyKeys
            ];
            Log::info(json_encode($logArray));
            return $next($request);
        }
        return $next($request);
    }
}
