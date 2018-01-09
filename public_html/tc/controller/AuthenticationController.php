<?php

date_default_timezone_set('America/Toronto');
error_reporting(E_ALL);
ini_set("display_errors", 1);
set_time_limit(0);

if(!isset($_SESSION)){
    session_start();
}

/*set api path*/
set_include_path(get_include_path() . PATH_SEPARATOR);

require_once '../dao/AuthenticationDAO.php';
require_once '../dao/UserDAO.php';
require_once '../model/AuthToken.php';
require_once '../model/User.php';

define('SECRET_KEY', "TalentCloud");

/**
 * 
 */
class AuthenticationController {

    /**
     * 
     * @param type $username
     * @param type $password
     * @return type
     */
    public static function getAuthToken($username, $password) {
        $authUser = AuthenticationController::authenticateUser($username, $password);
        //var_dump($authUser);
        if($authUser && $authUser->getIs_confirmed()){
            $tokenGeneric = SECRET_KEY.$authUser->getPassword(); // It can be 'stronger' of course
            //generate token
            $token = hash('sha256', $tokenGeneric);
            $now = new DateTime();
            $expiryDate = $now->getTimestamp() + 3600;
            //createArray
            $result = array('access_token' => $token, 'expires_in'=> $expiryDate, 'token-type' => 'bearer','scope' => null);
            //store authtoken 
            AuthenticationDAO::storeAuthToken($result,$authUser);
        }else{
            $result = array('failed' => 'Invalid user');
        }
        return $result;
    }

    /**
     * 
     * @global type $dbResourcesArray
     * @return type
     */
    public static function authenticateUser($username,$password) {
        $authUser = UserDAO::getUserByCredentials($username, $password);
        if($authUser){
            $authUser->setPassword($password);
        }
        return $authUser;
    }
}

?>