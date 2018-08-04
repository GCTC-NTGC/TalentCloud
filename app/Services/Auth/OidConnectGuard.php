<?php

namespace App\Services\Auth;

use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Contracts\Auth\Authenticatable;

class OidConnectGuard implements Guard {

    protected $request;
    protected $provider;
    protected $user;
    
    /**
     * The user roles that will be considered valid
     * 
     * @var array
     */
    protected $validRoles;

    /**
     * Create a new authentication guard.
     *
     * @param  \Illuminate\Contracts\Auth\UserProvider  $provider
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $validRoles
     * @return void
     */
    public function __construct(UserProvider $provider, $validRoles, Request $request) {
        $this->request = $request;
        $this->provider = $provider;
        $this->user = NULL;        
        $this->validRoles = $validRoles;
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
        // If we've already retrieved the user for the current request we can just
        // return it back immediately. We do not want to fetch the user data on
        // every call to this method because that would be tremendously slow.
        if (! is_null($this->user)) {
            return $this->user;
        }
        
        $user = null;
        
        //TODO remove test version
        $iss = '800830';
        $sub = '1025';
        $name = "Tristan Test";
        $email = "test@test.com";
        
        $credentials = ['iss' => $iss,
            'sub' => $sub,
            'name' => $name,
            'email' => $email];
        
        $user = $this->provider->retrieveByCredentials($credentials);
        
        $this->user = $user;
        return $user;
    }

    public function validate(array $credentials = array()): bool {
        $user = $this->user();
        return in_array($user->getRole(), $this->validRoles);
    }

}
