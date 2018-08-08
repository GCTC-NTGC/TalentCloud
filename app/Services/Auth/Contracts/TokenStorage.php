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
}

