<?php
namespace App\Services\Auth\Contracts;

use Lcobucci\JWT\Token;
use App\Exceptions\Auth\TokenRequestException;
use App\Exceptions\Auth\TokenStorageException;

interface TokenRefresher
{
    /**
     * Fetch and return Refresh token by iss and sub params.
     * 
     * @param string $sub
     * @param string $iss
     * @return Token
     * @throws TokenRequestException
     * @throws TokenStorageException
     */
    public function refreshIDToken(string $sub, string $iss);
}
