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
    
    require_once '../controller/JobApplicationController.php';
    require_once '../model/JobApplicationWithAnswers.php';
    require_once '../model/JobPosterApplication.php';
    require_once '../model/ApplicationQuestionAnswer.php';
    require_once '../utils/Utils.php';

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
                $jobPosterApplicationId = Utils::getParameterFromRequest($requestParams, 4);
                $jobApplicationWithAnswers = JobApplicationController::getJobApplicationWithAnswersById($jobPosterApplicationId);
                
                $json = json_encode($jobApplicationWithAnswers, JSON_PRETTY_PRINT);
                echo($json);
            } else {
                $result = array();
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }
            break;
        case 'POST':
            //Authenticate that the submitting user owns job seeker profile
            
            //Assemble JobApplicationWithAnswers object from JSON
            $jsonBody = file_get_contents('php://input');
            $jsonJobApplicationWithAnswers = json_decode($jsonBody, TRUE);
       
            $jsonJobPosterApplication = $jsonJobApplicationWithAnswers["job_poster_application"];
            
            $jobPosterApplication = new JobPosterApplication();
            $jobPosterApplication->setApplication_job_poster_id($jsonJobPosterApplication["application_job_poster_id"]);
            $jobPosterApplication->setApplication_job_seeker_profile_id($jsonJobPosterApplication['application_job_seeker_profile_id']);
            
            $questionAnswers = [];
            foreach ($jsonJobApplicationWithAnswers['application_question_answers'] as $jsonQA) {
                $questionAnswer = new ApplicationQuestionAnswer();
                $questionAnswer->setJob_poster_question_id($jsonQA['job_poster_question_id']);
                $questionAnswer->setAnswer($jsonQA['answer']);
                $questionAnswers[] = $questionAnswer;
            }
            
            $jobApplicationWithAnswers = new JobApplicationWithAnswers($jobPosterApplication, $questionAnswers);
            
            $jobPosterApplicationId = JobApplicationController::createJobApplicationWithAnswers($jobApplicationWithAnswers);
            $returnMap = array('job_poster_application_id' => $jobPosterApplicationId);
            $json = json_encode($returnMap, JSON_PRETTY_PRINT);
            echo($json);
            
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
            header("Access-Control-Allow-Methods: GET,POST");
            echo("");
            break;
    }