<?php

namespace App\Http\Middleware;

use App\Exceptions\TwoFactorRequiredException;
use Closure;
use PragmaRX\Google2FALaravel\Support\Authenticator;
use PragmaRX\Google2FALaravel\Middleware;

class Require2FA extends Middleware
{
    public function handle($request, Closure $next)
    {
        $authenticator = app(Authenticator::class)->boot($request);

        if (!$authenticator->isActivated()) {
            throw new TwoFactorRequiredException();
        }

        return parent::handle($request, $next);
    }
}
