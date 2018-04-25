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

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    header("Accept: application/json");

    $context = '/';

    $requestParams = substr($requestURI,strlen($context)+1);
    
    switch ($requestMethod) {
    case 'GET':
        if(isset($_SERVER["HTTP_AUTHORIZATION"])){
            $jwt = JWTUtils::getTokenFromRequest($_SERVER["HTTP_AUTHORIZATION"]);

            $open_id = Utils::getParameterFromRequest($requestParams, $user_id_param_index);

            if(strlen($requestParams) > 1){

                if(strlen($open_id) > 0){

                    $user = new User();

                    $user->setOpen_id($open_id);

                    if(JWTUtils::validateJWT($jwt, $user)){

                        $result = UserController::getUserByOpenId($user);

                        $json = json_encode($result, JSON_PRETTY_PRINT);

                        echo($json);

                    }else{
                        header('HTTP/1.0 401 Unauthorized');
                        echo json_encode(array("failed"=>"Invalid token"),JSON_FORCE_OBJECT);
                        exit;
                    }

                }else{
                    header('HTTP/1.0 401 Unauthorized');
                    echo json_encode(array("failed"=>"No user id provided"),JSON_FORCE_OBJECT);
                    exit;
                }
            }else{
                header('HTTP/1.0 401 Unauthorized');
                echo json_encode(array("failed"=>'Invalid token, please reauthorize user'),JSON_FORCE_OBJECT);
                exit;
            }
        }else{
            header('HTTP/1.0 401 Unauthorized');
            echo json_encode(array("failed"=>'No authorization token provided'),JSON_FORCE_OBJECT);
            exit;
        }
        break;
    case 'POST':
        if(isset($_SERVER["HTTP_AUTHORIZATION"])){
            $jwt = JWTUtils::getTokenFromRequest($_SERVER["HTTP_AUTHORIZATION"]);
        
            $jsonBody = file_get_contents('php://input');
            if(strlen($jsonBody) > 1){
                
                $credentials = json_decode($jsonBody, TRUE); //convert JSON into array
                //var_dump($credentials);
                if($credentials !== null){

                    $user = new User();

                    $user->setOpen_id($credentials["sub"]);
                    $user->setName($credentials["name"]);
                    $user->setEmail($credentials["email"]);
                    $user->setUser_role($credentials["user_role"]);

                    if(JWTUtils::validateJWT($jwt, $user)){
                        
                        $result = UserController::getUserByOpenId($user);

                        $json = json_encode($result, JSON_PRETTY_PRINT);

                        echo($json);
                    }else{
                        header('HTTP/1.0 401 Unauthorized');
                        echo json_encode(array("failed"=>"Invalid token"),JSON_FORCE_OBJECT);
                        exit;
                    }
                }else{
                    header('HTTP/1.0 400 Bad Request');
                    echo json_encode(array("failed"=>"Bad Reqest"),JSON_FORCE_OBJECT);
                    exit;
                }
                
            }else{
                header('HTTP/1.0 400 Bad Request');
                echo json_encode(array("failed"=>"Bad Reqest"),JSON_FORCE_OBJECT);
                exit;
            }
        }else{
            header('HTTP/1.0 401 Unauthorized');
            echo json_encode(array("failed"=>'No authorization token provided'),JSON_FORCE_OBJECT);
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