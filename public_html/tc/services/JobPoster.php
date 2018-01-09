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
    
    require_once '../controller/JobPosterController.php';
    require_once '../utils/Utils.php';

    $requestMethod = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_ENCODED);
    $requestURI = urldecode(filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_ENCODED));

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=utf-8");

    $context = '/';

    $requestParams = substr($requestURI,strlen($context));
    //var_dump($requestParams);
    switch ($requestMethod) {
        case 'GET':

            if(strlen($requestParams) > 1){
                $locale = Utils::getLocaleFromRequest($requestParams);
                $jobPosterId = Utils::getParameterFromRequest($requestParams,5);
                $result = JobPosterController::getJobPosterById($locale,$jobPosterId);
                $json = json_encode($result, JSON_PRETTY_PRINT);
                header("Content-length:".strlen($json));
                echo($json);
            }else{
                $result = array();
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }

            break;
        case 'POST':
            header("Accept: application/json");
            $jsonBody = file_get_contents('php://input');
            
            if(strlen($jsonBody) > 1){
                $jobPosterJSON = json_decode($jsonBody, TRUE);
                
                $jobPoster = new JobPoster();
                $jobPoster->setTitle($jobPosterJSON["createJobPoster_jobTitle"]);
                $jobPoster->setTerm_units($jobPosterJSON["createJobPoster_termUnits"]);
                $jobPoster->setTerm_qty($jobPosterJSON["createJobPoster_termQuantity"]);
                $jobPoster->setJob_min_level("");
                $jobPoster->setJob_max_level("");
                $jobPoster->setJob_start_date("");
                $jobPoster->setJob_end_date($jobPoster[""]);
                $jobPoster->setClose_date($jobPoster["createJobPoster_closeDate_fr"]);
                $jobPoster->setDepartment($jobPoster["createJobPoster_department"]);
                $jobPoster->setLocation_province($jobPoster["createJobPoster_province"]);
                $jobPoster->setLocation_city($jobPoster["createJobPoster_city"]);
                $result = JobPosterController::createJobPoster($jobPoster);
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }else{
                $result = array();
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
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
            header("Access-Control-Allow-Headers: accept, content-type");
            header("Access-Control-Allow-Methods: GET,POST");
            echo("");
            break;
    }
   
   ?>