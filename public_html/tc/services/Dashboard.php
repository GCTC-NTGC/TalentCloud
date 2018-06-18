<?php

    require_once __DIR__ . '/../config/php.config.inc';

    /*set api path*/
    set_include_path(get_include_path() . PATH_SEPARATOR);

    require_once __DIR__ . '/../controller/AuthenticationController.php';
    require_once __DIR__ . '/../controller/DashboardController.php';
    require_once __DIR__ . '/../model/UserPermission.php';
    require_once __DIR__ . '/../utils/Utils.php';

    $requestMethod = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_ENCODED);
    $requestURI = urldecode(filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_ENCODED));

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=utf-8");
    header("Accept: application/json");

    $context = '/';

    $requestParams = substr($requestURI, strlen($context));
    $user_id_param_index = 5;
    //$headers = apache_request_headers();

    switch ($requestMethod) {
        case 'GET':

            $userId = Utils::getParameterFromRequest($requestParams, $user_id_param_index);
            $locale = Utils::getLocaleFromRequest($requestParams);

            if(strlen($requestParams) > 1){

                if(strlen($userId) > 0){

                    //This is viewable by admins and the specified user
                    $userPermissions = [];
                    $userPermissions[] = new UserPermission(ROLE_ADMIN);
                    $userPermissions[] = new UserPermission(ROLE_APPLICANT, $userId);
                    AuthenticationController::validateUser($userPermissions);

                    $result = DashboardController::getDashboardByUserId($userId, $locale);
                    $json = json_encode($result, JSON_PRETTY_PRINT);

                    echo($json);

                } else {
                    header('HTTP/1.0 400 Bad Request');
                    echo json_encode(array("failed"=>"No user id provided"),JSON_FORCE_OBJECT);
                    exit;
                }

            } else {
                header('HTTP/1.0 400 Bad Request');
                echo json_encode(array("failed"=>'No request parameters provided'),JSON_FORCE_OBJECT);
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