<?php

    require_once __DIR__ . '/../config/php.config.inc';

    /*set api path*/
    set_include_path(get_include_path() . PATH_SEPARATOR);
    
    require_once __DIR__ . '/../controller/AuthenticationController.php';
    require_once __DIR__ . '/../controller/JobApplicationController.php';
    require_once __DIR__ . '/../model/JobApplicationWithAnswers.php';
    require_once __DIR__ . '/../model/UserPermission.php';
    require_once __DIR__ . '/../utils/Utils.php';

    $requestMethod = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_ENCODED);
    $requestURI = urldecode(filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_ENCODED));

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=utf-8");

    $context = '/';

    $requestParams = substr($requestURI, strlen($context));
    //var_dump($requestParams);
    switch ($requestMethod) {
        case 'GET':
            //Here Handle PUT Request 
            //$jsonBody = file_get_contents('php://input');
            if (strlen($requestParams) > 1) {
                //$jobSeekerJSON = json_decode($jsonBody, TRUE);
                //var_dump($jobSeekerJSON);
                $jobPosterId = Utils::getParameterFromRequest($requestParams, 4);
                $jobApplicationsWithAnswers = JobApplicationController::getJobApplictionsWithAnswersByJobPoster($jobPosterId);
                
                //Authenticate that the submitting user owns the job poster or is admin
                $userPermissions[] = new UserPermission(ROLE_ADMIN);
                //TODO: add Manager permission
                AuthenticationController::validateUser($userPermissions);
                
                $json = json_encode($jobApplicationsWithAnswers, JSON_PRETTY_PRINT);
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
            //$jsonBody = file_get_contents('php://input');
            /*
            if(strlen($requestParams) > 1){
                //$jobSeekerJSON = json_decode($jsonBody, TRUE);
                //var_dump($jobSeekerJSON);
                $jobPosterId = Utils::getParameterFromRequest($requestParams,4);
                $jobSeekerProfileId = Utils::getParameterFromRequest($requestParams,5);
                $jobPosterApplication = JobPosterApplicationController::addJobPosterApplication($jobPosterId,$jobSeekerProfileId);
                
                $json = json_encode($jobPosterApplication, JSON_PRETTY_PRINT);
                echo($json);
            } else{
                $result = array();
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }
            break;
             * 
             */
        case 'OPTIONS':
            //Here Handle OPTIONS/Pre-flight requests
            header("Access-Control-Allow-Headers: accept, content-type");
            header("Access-Control-Allow-Methods: GET");
            echo("");
            break;
    }