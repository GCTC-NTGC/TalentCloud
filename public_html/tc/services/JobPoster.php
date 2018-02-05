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
    require_once '../model/JobPosterNonLocalized.php';
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
                $en = "en_CA";
                $fr = "fr_CA";
                
                $jobPoster = new JobPosterNonLocalized();
                $jobPoster->setTitle_en($jobPosterJSON["title"][$en]);
                $jobPoster->setTitle_fr($jobPosterJSON["title"][$fr]);
                $jobPoster->setDepartment_id($jobPosterJSON["department_id"]);
                $jobPoster->setProvince_id($jobPosterJSON["province_id"]);
                $jobPoster->setCity_en($jobPosterJSON["city"][$en]);
                $jobPoster->setCity_fr($jobPosterJSON["city"][$fr]);
                $jobPoster->setTerm_qty($jobPosterJSON["term_qty"]);
                $jobPoster->setTerm_units_id($jobPosterJSON["term_units_id"]);
                $jobPoster->setOpen_date($jobPosterJSON["open_date_time"]);
                $jobPoster->setClose_date($jobPosterJSON["close_date_time"]);
                $jobPoster->setStart_date($jobPosterJSON["start_date"]);
                $jobPoster->setRemuneration_range_low($jobPosterJSON["remuneration_range_low"]);
                $jobPoster->setRemuneration_range_high($jobPosterJSON["remuneration_range_high"]);
                $jobPoster->setJob_min_level_id($jobPosterJSON["job_min_level_id"]);
                $jobPoster->setJob_max_level_id($jobPosterJSON["job_max_level_id"]);
                $jobPoster->setImpact_en($jobPosterJSON["impact"][$en]);
                $jobPoster->setImpact_fr($jobPosterJSON["impact"][$fr]);
               
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