<?php

namespace App\Services\Auth\Contracts;

use \Illuminate\Contracts\Auth\Authenticatable;

interface OidcAuthenticatable extends Authenticatable
{
    /**
     * Get the user's role
     *
     * @return string
     */
    public function getRole();

    /**
     * Get the OpenID Connect Sub code for the user that matches the given
     * issuer code.
     *
     * @return string
     */
    public function getSub(string $iss);


    /**
     * Get the OidcAuthenticatable object that matches the given issuer and sub.
     *
     * @return App\Services\Auth\Contracts\OidcAuthenticatable|null
     */
    public function findByOidcSub($iss, $sub);

    /**
     * Get the OidcAuthenticatable object initialized with the given data.
     *
     * @return App\Services\Auth\Contracts\OidcAuthenticatable
     */
    public function createWithOidcCredentials($name, $email, $iss, $sub, $role);
}
