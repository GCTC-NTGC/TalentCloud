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
     * The user roles that will be considered valid
     * 
     * @var array
     */
    protected $validRoles;

    /**
     * Create a new authentication guard.
     * 
     * 
     * @param UserProvider $provider
     * @param RequestTokenParser $requestTokenParser
     * @param JwtValidator $jwtValidator
     * @param TokenRefresher $tokenRefresher
     * @param array $validRoles
     * @param Request $request
     */
    public function __construct(UserProvider $provider, 
            RequestTokenParser $requestTokenParser, 
            JwtValidator $jwtValidator, 
            TokenRefresher $tokenRefresher,
            array $validRoles, 
            Request $request) {
        $this->request = $request;
        $this->provider = $provider;
        $this->requestTokenParser = $requestTokenParser;
        $this->jwtValidator = $jwtValidator;
        $this->tokenRefresher = $tokenRefresher;
        $this->validRoles = $validRoles;
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

    public function id() {
        if ($this->user()) {
            return $this->user()->getAuthIdentifier();
        }
    }

    public function setUser(Authenticatable $user): void {
        $this->user = $user;
    }

    public function user() {
        debugbar()->info("in Guard.user()");
        
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
            
            //TODO refresh token
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
            //TODO store new id token
            $this->requestTokenParser->save($idToken);
        }

        $credentials = $idToken->getClaims();

        $user = $this->provider->retrieveByCredentials($credentials);
        
        $this->user = $user;        
        return $user;
    }

    public function validate(array $credentials = array()): bool {
        debugbar()->info("in Guard.validate()");
        
        $user = $this->user();
        return in_array($user->getRole(), $this->validRoles);
    }
}
