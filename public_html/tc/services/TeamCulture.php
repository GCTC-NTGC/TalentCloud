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
    
    require_once __DIR__ . '/../controller/TeamCultureController.php';
    require_once __DIR__ . '/../controller/UserController.php';
    require_once __DIR__ . '/../model/TeamCulture.php';
    require_once __DIR__ . '/../model/TeamCultureNonLocalized.php';
    require_once __DIR__ . '/../utils/Utils.php';
    require_once __DIR__ . '/../utils/JWTUtils.php';

    $requestMethod = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_ENCODED);
    $requestURI = urldecode(filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_ENCODED));

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=utf-8");

    $context = '/';

    $requestParams = substr($requestURI, strlen($context));
    //var_dump($requestParams);
    switch ($requestMethod) {
        case 'GET':
            if (strlen($requestParams) > 1) {
                $locale = Utils::getLocaleFromRequest($requestParams);
                $managerProfileId = Utils::getParameterFromRequest($requestParams, 5);
                
                $result = TeamCultureController::getTeamCultureByManagerProfileId($managerProfileId, $locale);
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            } else {
                $result = array();
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }
            break;
        case 'POST':
            
            break;
        case 'DELETE':
            //Here Handle DELETE Request 
            break;
        case 'PUT':            
 
            break;
        case 'OPTIONS':
            //Here Handle OPTIONS/Pre-flight requests
            header("Access-Control-Allow-Headers: accept, content-type");
            header("Access-Control-Allow-Methods: GET");
            echo("");
            break;
    }