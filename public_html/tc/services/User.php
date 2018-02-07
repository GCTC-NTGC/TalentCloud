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
    $user_id_param_index = 4;
    //var_dump($requestParams);
    switch ($requestMethod) {
        case 'GET':
            $user_id = Utils::getParameterFromRequest($requestParams, $user_id_param_index);
            
            if(strlen($requestParams) > 1){
                if(strlen($user_id) > 1){
                    $user = new User();
                    $user->setUser_id($user_id);
                    $result = UserController::getUserById($user);
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
            //Here Handle PUT Request 
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