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

    require_once '../controller/AuthenticationController.php';
    require_once '../controller/UserController.php';
    require_once '../model/User.php';
    require_once '../utils/Utils.php';
    
    $requestMethod = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_ENCODED);
    $requestURI = urldecode(filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_ENCODED));
    //var_dump($requestMethod);

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    header("Accept: application/json");
    //header("Access-Control-Allow-Methods: GET,POST");

    $context = '/';

    $requestParams = substr($requestURI,strlen($context)+1);
    
    
    switch ($requestMethod) {
    case 'GET':
        header('HTTP/1.0 401 Unauthorized');
        echo json_encode(array("failed"=>"Authorization declined"),JSON_FORCE_OBJECT);
        exit;
        break;
    case 'POST':
        $jsonBody = file_get_contents('php://input');
        //var_dump($jsonBody);
        if(strlen($jsonBody) > 1){
            $credentials = json_decode($jsonBody, TRUE); //convert JSON into array
            //var_dump($credentials);
            $token = $credentials['authToken'];
            if($token == null){
                $token = AuthenticationController::getAuthToken($credentials['email'], $credentials['password']);
            }
            
            if($token == null){
                header('HTTP/1.0 401 Unauthorized');
                echo json_encode(array("failed"=>"Authorization declined"),JSON_FORCE_OBJECT);
                exit;
            }
            
            $json = json_encode(array("token"=>$token),JSON_FORCE_OBJECT);
            echo($json);
        }else{
            header('HTTP/1.0 401 Unauthorized');
            echo json_encode(array("failed"=>"Authorization declined"),JSON_FORCE_OBJECT);
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
    header("Access-Control-Allow-Headers: Accept, Content-Type, Access-Control-Allow-Origin, x-access-token");
        header("Access-Control-Allow-Methods: GET,POST");
        echo("");
        break;
   }
   ?>