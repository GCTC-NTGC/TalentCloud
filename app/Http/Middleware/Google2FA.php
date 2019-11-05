<?php

namespace App\Http\Middleware;

use Closure;
use PragmaRX\Google2FALaravel\Support\Authenticator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;

/**
 * Based on \PragmaRX\Google2FALaravel\Middleware
 */
class Google2FA
{
    public function handle($request, Closure $next)
    {
        $authenticator = app(Authenticator::class)->boot($request);
        $remember = $request->cookie('remember_device');

        if ($authenticator->isAuthenticated() || $remember === 'yes') {
            if (!$authenticator->isAuthenticated()) {
                Log::notice('User skipped OTP entry with known device.', ['id' => $request->user()->id]);
            }
            return $next($request);
        }
        // Unlike \PragmaRX\Google2FALaravel\Middleware, set the intended url.
        // Check if the intended url already exists, if not then store in global session.
        if (!session()->has('url.expected')) {
            Session::put('url.expected', URL::full());
        }
        return $authenticator->makeRequestOneTimePasswordResponse();
    }
}
