<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * Indicates whether the XSRF-TOKEN cookie should be set on the response.
     *
     * @var bool
     */
    protected $addHttpCookie = false;

    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        //
    ];


    /**
     * OVERRIDE to make adding XSRF-TOKEN cookie optional
     *
     * Add the CSRF token to the response cookies.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Symfony\Component\HttpFoundation\Response  $response
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function addCookieToResponse($request, $response)
    {
        if ($this->addHttpCookie) {
            $config = config('session');
            $response->headers->setCookie(
                new Cookie(
                    'XSRF-TOKEN', $request->session()->token(), $this->availableAt(60 * $config['lifetime']),
                    $config['path'], $config['domain'], $config['secure'], false, false, $config['same_site'] ?? null
                )
            );
        }

        return $response;
    }
}
