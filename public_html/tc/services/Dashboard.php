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

    require_once '../controller/DashboardController.php';
    require_once '../utils/JWTUtils.php';
    require_once '../utils/Utils.php';

    $requestMethod = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_ENCODED);
    $requestURI = urldecode(filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_ENCODED));

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=utf-8");
    header("Accept: application/json");

    $context = '/';

    $requestParams = substr($requestURI,strlen($context));
    $user_id_param_index = 5;
    //$headers = apache_request_headers();

    switch ($requestMethod) {
        case 'GET':
           
            if(isset($_SERVER["HTTP_AUTHORIZATION"])){
                $jwt = JWTUtils::getTokenFromRequest($_SERVER["HTTP_AUTHORIZATION"]);
                
                $user_id = Utils::getParameterFromRequest($requestParams, $user_id_param_index);
                $locale = Utils::getLocaleFromRequest($requestParams);
                
                if(strlen($requestParams) > 1){

                    if(strlen($user_id) > 0){

                        $user = new User();

                        $user->setUser_id($user_id);

                        if(JWTUtils::validateJWT($jwt, $user)){
                            $result = DashboardController::getDashboardByUserId($user_id, $locale);
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
            /*
            if(strlen($requestParams) > 1){
                $locale = Utils::getLocaleFromRequest($requestParams);
                $managerId = Utils::getParameterFromRequest($requestParams, $paramIndex);
                $result = JobPosterController::getJobPostersByManagerId($locale,$managerId);
                $json = json_encode($result, JSON_PRETTY_PRINT);
                header("Content-length:".strlen($json));
                echo($json);
            }else{
                $result = array();
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }
             * 
             */

            break;
        case 'POST':
            break;
        case 'DELETE':
            //Here Handle DELETE Request 
            break;
        case 'PUT':
            //Here Handle PUT Request 
            break;
        case 'OPTIONS':
            //Here Handle OPTIONS/Pre-flight requests
            header("Access-Control-Allow-Headers: accept, content-type");
            header("Access-Control-Allow-Methods: GET");
            echo("");
            break;
    }
   
   ?>