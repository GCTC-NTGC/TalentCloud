<?php

namespace App\Services\Auth;

use App\Services\Auth\Contracts\TokenStorage;

class SessionTokenStorage implements TokenStorage {

    public function fetchRefresh(string $iss, string $sub) {
        $key = $this->refreshKey($iss, $sub);
        return session($key);
    }

    public function saveRefresh(string $iss, string $sub, string $refreshToken) {
        $key = $this->refreshKey($iss, $sub);
        session([$key => $refreshToken]);
        return true;
    }

    protected function refreshKey(string $iss, string $sub) {
        return $key = implode('.', ['refreshToken', $iss, $sub]);
    }

    public function fetchAccess(string $iss, string $sub) {
        $key = $this->accessKey($iss, $sub);
        return session($key);
    }

    public function saveAccess(string $iss, string $sub, string $accessToken) {
        $key = $this->accessKey($iss, $sub);
        session([$key => $accessToken]);
        return true;
    }

    protected function accessKey(string $iss, string $sub) {
        return $key = implode('.', ['accessToken', $iss, $sub]);
    }

    public function forgetAccess(string $iss, string $sub) {
        $key = $this->accessKey($iss, $sub);
        session()->forget($key);
    }

    public function forgetRefresh(string $iss, string $sub) {
        $key = $this->refreshKey($iss, $sub);
        session()->forget($key);
    }

}
