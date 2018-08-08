<?php

namespace App\Services\Auth;

use App\Services\Auth\Contracts\TokenStorage;

class SessionTokenStorage implements TokenStorage {
    
    public function fetchRefresh(string $iss, string $sub) {
        $key = $this->tokenKey($iss, $sub); 
        return session($key);
    }

    public function saveRefresh(string $iss, string $sub, string $refreshToken): bool {
        $key = $this->tokenKey($iss, $sub); 
        session([$key => $refreshToken]);
        return true;
    }
    
    protected function tokenKey(string $iss, string $sub) {
        return $key = implode('.', ['refreshToken', $iss, $sub]);
    }

}
