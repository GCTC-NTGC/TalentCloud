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

require_once '../controller/UserController.php';
require_once '../model/User.php';
require_once '../utils/Utils.php';

$requestMethod = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_ENCODED);
$requestURI = urldecode(filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_ENCODED));

    $context = '/';
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=utf-8");
    $requestParams = substr($requestURI,strlen($context));
    //var_dump($requestParams);
    switch ($requestMethod) {
        case 'GET':
            $jsonBody = json_encode($_GET);
            //var_dump($jsonBody);
            if(strlen($jsonBody) > 1){
                $credentials = json_decode($jsonBody, TRUE); //convert JSON into array
                $email = $credentials['username'];
                $password = $credentials['password'];
                if(strlen($credentials) > 1){
                    $result = UserController::getUserByCredentials($email,$password);
                    $json = json_encode($result, JSON_PRETTY_PRINT);
                    echo($json);
                }else{
                    $result = array();
                    $json = json_encode($result, JSON_PRETTY_PRINT);
                    echo($json);
                }
            
            }else{
                header('HTTP/1.0 401 Unauthorized');
                echo 'Authorization declined';
                exit;
            }

            break;
        case 'POST':
            $jsonBody = file_get_contents('php://input');
            //var_dump($jsonBody);
            if(strlen($jsonBody) > 1){
                if(Utils::getParameterFromRequest($requestParams,4) === "update") {
                    $userJson = json_decode($jsonBody, TRUE);

                    $updatedUser = new User();
                    $updatedUser->setUser_id($userJson['user_id']);
                    $updatedUser->setEmail($userJson['email']);
                    $updatedUser->setPassword($userJson['password']);
                    $updatedUser->setFirstname($userJson['firstname']);
                    $updatedUser->setLastname($userJson['lastname']);
                    $updatedUser->setUser_role($userJson['user_role']);

                    $result = UserController::updateUser($updatedUser);
                    $json = json_encode($result, JSON_PRETTY_PRINT);
                    echo($json);
                    
                } else if (Utils::getParameterFromRequest($requestParams,4) === "register") {
           
                    $credentials = json_decode($jsonBody, TRUE); //convert JSON into array
                    $email = $credentials['email'];
                    $password = $credentials['password'];
                    $userrole = $credentials['userrole'];
                    if(strlen($email) > 1){
                        $newUser = new User();
                        $newUser->setEmail($email);
                        $newUser->setPassword($password);
                        $newUser->setUser_role($userrole);
                        $userRegistered = UserController::registerUser($newUser);
                        $json = json_encode($userRegistered, JSON_PRETTY_PRINT);
                        echo($json);
                    }else{
                        $result = array();
                        $json = json_encode($result, JSON_PRETTY_PRINT);
                        echo($json);
                    }
                }
            }else{
                header('HTTP/1.0 401 Unauthorized');
                echo 'Authorization declined';
                exit;
            }
            break;
        case 'DELETE':
            //Here Handle DELETE Request 
            break;
        case 'PUT':
            //TODO: check authaurization
            break;
        case 'OPTIONS':
            //Here Handle OPTIONS/Pre-flight requests
            header("Access-Control-Allow-Origin: *");
            header("Content-Type: application/json; charset=utf-8");
            header("Access-Control-Allow-Headers: accept, content-type");
            header("Access-Control-Allow-Methods: GET,POST");
            echo("");
            break;
    }

?>