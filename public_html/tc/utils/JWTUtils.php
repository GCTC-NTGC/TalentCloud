<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$path = dirname(getcwd());

//var_dump(ROOT);
require_once $path.'/config/auth.config.inc';
require_once $path.'/model/User.php';
require_once $path.'/utils/Utils.php';

/**
 * Description of JWTUtils
 *
 * @author gregg
 */
class JWTUtils {
    
    /**
     * 
     * @param User $user
     * @return type
     */
    public static function generateJWT(User $user){
        $key = SECRET;
        //var_dump($key);
        $header = JWTUtils::setHeader();
        $payload = JWTUtils::setPayload($user);
        $signature = JWTUtils::setSignature($header, $payload, $key);
        $token = JWTUtils::setToken($header, $payload, $signature);
        return $token;
    }
    
    /**
     * 
     * @return type
     */
    public static function setHeader(){
        
        $header_content = array("alg"=>"HS256", "typ"=>"JWT");
        
        $header = Utils::base64url_encode(json_encode($header_content, JSON_FORCE_OBJECT));

        return $header;
        
    }
    
    /**
     * 
     * @param type $token
     */
    public static function getPayloadFromToken($jwt){
        
        $jwt_elements = explode('.', $jwt);
        $payload = json_decode(Utils::base64url_decode($jwt_elements[1]),TRUE);
        //var_dump($payload);
        return $payload;
    }
    
    /**
     * 
     * @param User $user
     * @return type
     */
    public static function setPayload(User $user){
        
        $user_id = $user->getUser_id();

        $iat = time();
        
        $expiryTime = time()+60*60*24; //expires in one day
        
        $payload_content = array("iat"=>$iat,"iss"=>"https://talentcloud.localhost","exp"=>$expiryTime,"user_id"=>$user_id);
        
        $payload = Utils::base64url_encode(json_encode($payload_content));

        return $payload;
        
    }
    
    /**
     * 
     * @param type $header
     * @param type $payload
     * @param type $key
     * @return type
     */
    public static function setSignature($header, $payload, $key){
        
        $unsignedToken = $header.'.'.$payload;
        
        $encoded_key = Utils::base64url_encode($key);
        
        $rawSignature = hash_hmac('sha256', $unsignedToken, $encoded_key, TRUE);
        
        $signatureEncoded = Utils::base64url_encode($rawSignature);
        
        return $signatureEncoded;
        
    }
    
    /**
     * 
     * @param type $header
     * @param type $payload
     * @param type $signature
     * @return string
     */
    public static function setToken($header,$payload,$signature){
        
        $token = $header.'.'.$payload.'.'.$signature;
        
        return $token;
        
    }
    
    /**
     * 
     * @param type $headers
     * @return type
     */
    public static function getTokenFromHeader($headers){
        $token = null;
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $token)) {
                return $token[1];
            }
        }
        return null;
    }
    
    /**
     * 
     * @param type $headers
     * @return type
     */
    public static function getTokenFromRequest($authHeader){
        $token = null;
        if (!empty($authHeader)) {
            if (preg_match('/Bearer\s(\S+)/', $authHeader, $token)) {
                return $token[1];
            }
        }
        return null;
    }
    
    /**
     * 
     * @param type $jwt
     * @return boolean
     */
    public static function validateJWT($jwt, $user){
        $isValid = true;
        
        // Split jwt string by '.' 
        $jwt_elements = explode('.', $jwt);
        
        $receivedPayload = JWTUtils::getPayloadFromToken($jwt);
        
        $exp = $receivedPayload['exp'];
        
        $now = Time();
        
        /*if($now < $exp){
            $isValid = true;
        }*/
        
        $key = SECRET;
        
        $evalSignature = Utils::base64url_decode(JWTUtils::setSignature($jwt_elements[0], $jwt_elements[1], $key));
        
        $recieved_signature = Utils::base64url_decode($jwt_elements[2]);
        
        // checking if the generated signature is equal to the received signature
        if($isValid){
            if(hash_equals($evalSignature, $recieved_signature)) {
                // If everything worked fine, if the signature is ok and the payload was not modified you should get a success message and the ecryption hashes match
                $isValid = true;   
            }
        }
        
        return $isValid;
        
    }
    
    public static function isExpired($exp){
        return false;
    }
    
    public static function issuedBy($iss){
        return true;
    }
    
}

?>