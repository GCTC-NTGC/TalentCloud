<?php

namespace App\Services\Auth;

use App\Services\Auth\Contracts\TokenRefresher;
use App\Services\Auth\Contracts\TokenStorage;
use Lcobucci\JWT\Token;
use Lcobucci\JWT\Parser;
use Jumbojett\OpenIDConnectClient;
use Jumbojett\OpenIDConnectClientException;
use App\Exceptions\Auth\TokenRequestException;
use App\Exceptions\Auth\TokenStorageException;

/**
 * Adapted from the OpenIDConnect Laravel package at
 * https://github.com/furdarius/oidconnect-laravel
 */
class JumboJettTokenRefresher implements TokenRefresher {
    
    /**
     * Used for saving and fetching refresh tokens.
     * @var TokenStorage 
     */
    protected $tokenStorage;
    
    /**
     *
     * @var Parser 
     */
    protected $parser;
    
    /**
     *
     * @var OpenIDConnectClient
     */
    protected $connectClient;
    
    public function __construct(TokenStorage $tokenStorage, Parser $parser, 
            string $authUrl, string $clientId, string $clientSecret) {
        $this->tokenStorage = $tokenStorage;
        $this->parser = $parser;
        $this->connectClient = new OpenIDConnectClient($authUrl, $clientId, $clientSecret);
    }
    
    /**
     * 
     * @param string $sub
     * @param string $iss
     * @return Token $idToken
     */
    public function refreshIDToken(string $sub, string $iss): \Lcobucci\JWT\Token {
        $refreshToken = $this->tokenStorage->fetchRefresh($iss, $sub);
        if (!$refreshToken) {
            throw new TokenStorageException("Failed to fetch refresh token");
        }
        try {
            $response = $this->connectClient->refreshToken($refreshToken);
            if (isset($response->error)) {
                //Delete refresh token if it failed
                $this->tokenStorage->saveRefresh($iss, $sub, null);
                throw new TokenRequestException($response->error);
            }
        } catch (OpenIDConnectClientException $exception) {
            //Delete refresh token if it failed
            $this->tokenStorage->saveRefresh($iss, $sub, null);
            throw new TokenRequestException($exception->getMessage());
        }        
        if (!$this->tokenStorage->saveRefresh($iss, $sub, $response->refresh_token)) {
            throw new TokenStorageException("Failed to store refresh token");
        }
        $this->tokenStorage->saveAccess($iss, $sub, $response->access_token);
        return $this->parser->parse($response->id_token);
    }
}

