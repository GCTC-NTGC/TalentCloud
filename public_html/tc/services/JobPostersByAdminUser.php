<?php

    require_once __DIR__ . '/../config/php.config.inc';

    /*set api path*/
    set_include_path(get_include_path() . PATH_SEPARATOR);

    require_once __DIR__ . '/../controller/JobPosterController.php';
    require_once __DIR__ . '/../utils/Utils.php';

    $requestMethod = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_ENCODED);
    $requestURI = urldecode(filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_ENCODED));

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=utf-8");
    header("Accept: application/json");

    $context = '/';

    $requestParams = substr($requestURI, strlen($context));

    switch ($requestMethod) {
        case 'GET':
            if (strlen($requestParams) > 1) {
                $locale = Utils::getLocaleFromRequest($requestParams);
                $userId = Utils::getParameterFromRequest($requestParams, 5);
                $result = JobPosterController::getJobPostersByManagerId($locale, $userId);
                $json = json_encode($result, JSON_PRETTY_PRINT);
                header("Content-length:" . strlen($json));
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