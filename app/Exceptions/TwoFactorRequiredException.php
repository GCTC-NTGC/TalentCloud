<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Support\Facades\Lang;

class TwoFactorRequiredException extends Exception
{
    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request $request Incoming request object.
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public function render(\Illuminate\Http\Request $request)
    {
        return response()->view(
            'errors/two_factor_required',
            [
                'exception' => $this,
                'error' => [
                    'title' => Lang::get('errors.title'),
                ],
            ],
            $this->getStatusCode()
        );
    }

    /**
     * Override, custom exception doesn't return a status code.
     *
     * @return mixed
     */
    public function getStatusCode()
    {
        return 403;
    }
}
