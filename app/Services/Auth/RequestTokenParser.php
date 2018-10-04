<?php
namespace App\Services\Auth;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Http\Request;
//use Lcobucci\JWT\Token;
//use Lcobucci\JWT\Token\Parser;
use Lcobucci\JWT\Token;
use Lcobucci\JWT\Parser;
use Barryvdh\Debugbar\Facade as Debugbar;

/**
 * Adapted from the OpenIDConnect Laravel package at
 * https://github.com/furdarius/oidconnect-laravel
 */
class RequestTokenParser
{
    const AUTH_HEADER = "Authorization";
    const COOKIE_KEY = "id_token";

    /**
     * @var Parser
     */
    private $parser;
    /**
     * TokenMiddleware constructor.
     *
     * @param Parser         $parser
     */
    public function __construct(
        Parser $parser
    ) {
        $this->parser = $parser;
    }
    /**
     * @param Request $request
     *
     * @return Token
     */
    public function parse(Request $request)
    {
//        if ($request->session()->has(static::COOKIE_KEY)) {
//            $token = $request->session()->get(static::COOKIE_KEY);
//        } else {
//            throw new AuthenticationException("Request doesn't contain id token");
//        }
        $token = $request->cookie(static::COOKIE_KEY);
        Debugbar::info("Retrieving token:");
        Debugbar::info($token);
        if (empty($token)) {
            throw new AuthenticationException("Request doesn't contain id token");
        }
        return $this->parser->parse($token);

         /*
        $bearer = $request->headers->get(static::AUTH_HEADER);
        if (empty($bearer)) {
            throw new AuthenticationException("Request doesn't contain auth token");
        }
        $parts = explode(" ", $bearer);
        if (count($parts) < 2) {
            throw new AuthenticationException("Invalid format of auth header");
        }
        $jwt = $parts[1];
        return $this->parser->parse($jwt);
          *
          */
    }

    /**
     * @param string $tokenString     *
     * @return Token
     */
    public function parseFromString(string $tokenString) {
        return $this->parser->parse($tokenString);
    }

    public function save(Token $token) {
        //session([static::COOKIE_KEY => (string)$token]);
        //Cookie::queue(static::COOKIE_KEY, (string)$token);
        Debugbar::info("Saving token:");
        Debugbar::info($token);
        cookie()->queue(cookie()->forever(static::COOKIE_KEY, (string)$token));
    }

    public function forget() {
        //session()->forget(static::COOKIE_KEY);
        // if (Cookie::hasQueued(static::COOKIE_KEY)) {
        //   Cookie::unqueue(static::COOKIE_KEY);
        // }
        // Cookie::queue(Cookie::forget(static::COOKIE_KEY));
        cookie()->queue(cookie()->forget(static::COOKIE_KEY));
    }
}
