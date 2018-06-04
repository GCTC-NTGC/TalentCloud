<?php

date_default_timezone_set('America/Toronto');
error_reporting(E_ALL);
ini_set("display_errors", 1);
set_time_limit(0);

if (!isset($_SESSION)) {
    session_start();
}

/*set api path*/
set_include_path(get_include_path() . PATH_SEPARATOR);

require_once __DIR__ . '/../dao/AuthenticationDAO.php';
require_once __DIR__ . '/../dao/UserDAO.php';
require_once __DIR__ . '/../model/AuthToken.php';
require_once __DIR__ . '/../model/User.php';
require_once __DIR__ . '/../utils/JWTUtils.php';

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
        if ($authUser && $authUser->getIs_confirmed()) {
            $token = JWTUtils::generateJWT($authUser);
            //store authtoken 
            //AuthenticationDAO::storeAuthToken($result,$authUser);
        }
        return $token;
    }

    /**
     * 
     * @global type $dbResourcesArray
     * @return type
     */
    public static function authenticateUser($username, $password) {
        $authUser = UserDAO::getUserByCredentials($username, $password);
        if ($authUser) {
            $authUser->setPassword($password);
        }
        return $authUser;
    }
}

?>