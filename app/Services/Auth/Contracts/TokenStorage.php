<?php

namespace App\Services\Auth\Contracts;

interface TokenStorage
{    
    /**
     * Save refresh token to be retrieved later
     *
     * @param string $iss
     * @param string $sub
     * @param string $refreshToken
     * @return bool
     */
    public function saveRefresh(string $iss, string $sub, string $refreshToken);
    
     /**
     * Fetch and return Refresh token by iss and sub params
     *
     * @param string $iss
     * @param string $sub
     * @return null|string
     */
    public function fetchRefresh(string $iss, string $sub);
    
    /**
     * Forget the refresh token, for the purpose of logging out
     * @param string $iss
     * @param string $sub
     * @return void
     */
    public function forgetRefresh(string $iss, string $sub);
    
    /**
     * Save access token to be retrieved later
     *
     * @param string $iss
     * @param string $sub
     * @param string $accessToken
     * @return bool
     */
    public function saveAccess(string $iss, string $sub, string $accessToken);
    
     /**
     * Fetch and return Access token by iss and sub params
     *
     * @param string $iss
     * @param string $sub
     * @return null|string
     */
    public function fetchAccess(string $iss, string $sub);  
    
    /**
     * Forget the access token, for the purpose of logging out
     * @param string $iss
     * @param string $sub
     * @return void
     */
    public function forgetAccess(string $iss, string $sub);
    
}

