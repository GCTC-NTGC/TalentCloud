<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class AuthToken {
    
    private $access_token;
    private $expires_in;
    private $token_type;
    private $scope;
    
    function __construct($access_token, $expires_in, $token_type, $scope) {
        $this->access_token = $access_token;
        $this->expires_in = $expires_in;
        $this->token_type = $token_type;
        $this->scope = $scope;
    }

    public function getAccess_token() {
        return $this->access_token;
    }

    public function getExpires_in() {
        return $this->expires_in;
    }

    public function getToken_type() {
        return $this->token_type;
    }

    public function getScope() {
        return $this->scope;
    }

    public function setAccess_token($access_token) {
        $this->access_token = $access_token;
    }

    public function setExpires_in($expires_in) {
        $this->expires_in = $expires_in;
    }

    public function setToken_type($token_type) {
        $this->token_type = $token_type;
    }

    public function setScope($scope) {
        $this->scope = $scope;
    }


}
