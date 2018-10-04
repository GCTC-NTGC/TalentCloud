<?php

namespace App\Services\Auth;

use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\AuthenticationException;
use App\Services\Auth\JwtValidator;
use App\Services\Auth\RequestTokenParser;
use App\Services\Auth\Contracts\TokenRefresher;
use App\Exceptions\Auth\TokenStorageException;
use App\Exceptions\Auth\TokenRequestException;

class OidConnectGuard implements Guard {

    protected $request;
    protected $provider;
    protected $requestTokenParser;
    protected $jwtValidator;
    protected $tokenRefresher;

    protected $user;

    /**
     * Set to true when user() has already ran once.
     * @var bool
     */
    protected $userAlreadyAttempted;

    /**
     * Create a new authentication guard.
     *
     *
     * @param UserProvider $provider
     * @param RequestTokenParser $requestTokenParser
     * @param JwtValidator $jwtValidator
     * @param TokenRefresher $tokenRefresher
     * @param Request $request
     */
    public function __construct(UserProvider $provider,
            RequestTokenParser $requestTokenParser,
            JwtValidator $jwtValidator,
            TokenRefresher $tokenRefresher,
            Request $request) {
        $this->request = $request;
        $this->provider = $provider;
        $this->requestTokenParser = $requestTokenParser;
        $this->jwtValidator = $jwtValidator;
        $this->tokenRefresher = $tokenRefresher;
        $this->user = NULL;
        $this->userAlreadyAttempted = false;
    }

    /**
     * Determine if the current user is authenticated.
     *
     * @return bool
     */
    public function check() {
        return !is_null($this->user());
    }

    /**
     * Determine if the current user is a guest.
     *
     * @return bool
     */
    public function guest() {
        return !$this->check();
    }

    /**
     * Get the ID for the currently authenticated user.
     *
     * @return int|null
     */
    public function id()
    {
        if ($this->user()) {
            return $this->user()->getAuthIdentifier();
        }
    }

    /**
     * Set the current user.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @return void
     */
    public function setUser(Authenticatable $user)
    {
        $this->user = $user;
    }

    public function user() {
        // If we've already retrieved the user for the current request we can just
        // return it back immediately. We do not want to fetch the user data on
        // every call to this method because that would be tremendously slow.
        if (! is_null($this->user) || $this->userAlreadyAttempted) {
            return $this->user;
        }

        $this->userAlreadyAttempted = true;
        $user = null;

        try {
            $idToken = $this->requestTokenParser->parse($this->request);
        } catch (AuthenticationException $exception) {
            //Return a null user is enough, swallow the exception here
            debugbar()->warning($exception->getMessage());
            return $user;
        }

        if (!$this->jwtValidator->claimsAreValid($idToken) ||
                !$this->jwtValidator->signatureIsValid($idToken)) {
            debugbar()->warning("Bearer token exists but is not valid");
            return $user;
        }

        //At this point, token is definitely valid
        if ($this->jwtValidator->isExpired($idToken)) {
            debugbar()->info("Id token expired");

            $iss = $idToken->getClaim("iss");
            $sub = $idToken->getClaim("sub");
            try {
                $idToken = $this->tokenRefresher->refreshIDToken($iss, $sub);
                debugbar()->info("Refreshed id token");

            } catch (TokenStorageException $storageException) {
                debugbar()->warning($storageException->getMessage());
                return $user;
            } catch (TokenRequestException $requestException) {
                debugBar()->warning($requestException->getMessage());
                return $user;
            }
            $this->requestTokenParser->save($idToken);
        }

        $credentials = $idToken->getClaims();

        $user = $this->provider->retrieveByCredentials($credentials);

        $this->user = $user;
        return $user;
    }

    public function validate(array $credentials = array()) {
        debugbar()->info("in Guard.validate()");
        if (empty($credentials['id_token'])) {
            return false;
        }
        $token = $this->requestTokenParser->parseFromString($credentials['id_token']);

        return $this->jwtValidator->claimsAreValid($idToken) &&
            !$this->jwtValidator->isExpired($idToken) &&
            $this->jwtValidator->signatureIsValid($idToken);
    }

    /**
     * Get the user provider used by the guard.
     *
     * @return \Illuminate\Contracts\Auth\UserProvider
     */
    public function getProvider()
    {
        return $this->provider;
    }

    /**
     * Set the user provider used by the guard.
     *
     * @param  \Illuminate\Contracts\Auth\UserProvider  $provider
     * @return void
     */
    public function setProvider(UserProvider $provider)
    {
        $this->provider = $provider;
    }

    /**
     * Determine if the current user is authenticated.
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable
     *
     * @throws \Illuminate\Auth\AuthenticationException
     */
    public function authenticate()
    {
        if (! is_null($user = $this->user())) {
            return $user;
        }

        throw new AuthenticationException;
    }
}
