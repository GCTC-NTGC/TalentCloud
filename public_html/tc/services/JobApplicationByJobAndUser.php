<?php

    require_once __DIR__ . '/../config/php.config.inc';

    /*set api path*/
    set_include_path(get_include_path() . PATH_SEPARATOR);
    
    require_once __DIR__ . '/../controller/AuthenticationController.php';
    require_once __DIR__ . '/../controller/JobApplicationController.php';
    require_once __DIR__ . '/../model/JobApplicationWithAnswers.php';
    require_once __DIR__ . '/../model/JobPosterApplication.php';
    require_once __DIR__ . '/../model/ApplicationQuestionAnswer.php';
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
            if (strlen($requestParams) > 1) {
                //TODO: authenticate user
                
                $jobPosterId = Utils::getParameterFromRequest($requestParams, 4);
                $userId = Utils::getParameterFromRequest($requestParams, 6);
                
                //Admins, and the owning applicant have permission to biew
                $userPermissions = [];
                $userPermissions[] = new UserPermission(ROLE_ADMIN);
                $userPermissions[] = new UserPermission(ROLE_APPLICANT, $userId);
                //TODO: add manager permission for owner of job poster
                AuthenticationController::validateUser($userPermissions);
                
                $jobApplicationWithAnswers = JobApplicationController::getJobApplicationWithAnswersByJobAndUser($jobPosterId, $userId);
                
                if ($jobApplicationWithAnswers === false) {
                    //job application not found
                    header('HTTP/1.0 404 Not Found');
                    echo json_encode(array("failed"=>"Requested application does not exist."), JSON_FORCE_OBJECT);
                    exit;
                }
                
                $json = json_encode($jobApplicationWithAnswers, JSON_PRETTY_PRINT);
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
            //TODO: Authenticate that the submitting user owns job seeker profile
            $jobPosterId = Utils::getParameterFromRequest($requestParams, 4);
            $userId = Utils::getParameterFromRequest($requestParams, 6);
            
            //Admins, and the owning applicant have permission to biew
            $userPermissions = [];
            $userPermissions[] = new UserPermission(ROLE_ADMIN);
            $userPermissions[] = new UserPermission(ROLE_APPLICANT, $userId);
            //TODO: add manager permission for owner of job poster
            AuthenticationController::validateUser($userPermissions);
            
            //Assemble JobApplicationWithAnswers object from JSON payload
            $jsonBody = file_get_contents('php://input');
            $jsonJobApplicationWithAnswers = json_decode($jsonBody, TRUE);
       
            $jsonJobPosterApplication = $jsonJobApplicationWithAnswers["job_poster_application"];
            
            $jobPosterApplication = new JobPosterApplication();
            //$jobPosterApplication->setApplication_job_poster_id($jsonJobPosterApplication["application_job_poster_id"]);
            $jobPosterApplication->setApplication_job_poster_id($jobPosterId);
            //TODO: ensure jobSeekerProfile belongs to userId
            $jobPosterApplication->setApplication_job_seeker_profile_id($jsonJobPosterApplication['application_job_seeker_profile_id']);
            $jobPosterApplication->setJob_poster_application_status_id($jsonJobPosterApplication["job_poster_application_status_id"]);
            
            $questionAnswers = [];
            foreach ($jsonJobApplicationWithAnswers['application_question_answers'] as $jsonQA) {
                $questionAnswer = new ApplicationQuestionAnswer();
                $questionAnswer->setJob_poster_question_id($jsonQA['job_poster_question_id']);
                $questionAnswer->setAnswer($jsonQA['answer']);
                $questionAnswers[] = $questionAnswer;
            }
            
            $jobApplicationWithAnswers = new JobApplicationWithAnswers($jobPosterApplication, $questionAnswers);
            
            //Check status of possibly pre-existing application:
            $prevApplication = JobApplicationController::getJobApplicationWithAnswersByJobAndUser($jobPosterId, $userId);
            if ($prevApplication) {
                if ($prevApplication->getJob_poster_application()->getJob_poster_application_status_id() == 1) {
                    //Previous application exists in draft form, so can be updated
                    
                    //Ensure id matches prev id
                    $prevId = $prevApplication->getJob_poster_application()->getJob_poster_application_id();
                    $jobApplicationWithAnswers->getJob_poster_application()->setJob_poster_application_id($prevId);
                    
                    JobApplicationController::updateJobApplicationWithAnswers($jobApplicationWithAnswers); 
                    $result = JobApplicationController::getJobApplicationWithAnswersById($prevId);
                    $json = json_encode($result, JSON_PRETTY_PRINT);
                    echo($json);
                } else {
                    //Previous application exist, but is not a draft, so cannot be updated
                    header('HTTP/1.0 403 Forbidden');
                    echo json_encode(array("failed"=>"Only Draft applications can be modified."), JSON_FORCE_OBJECT);
                    exit;
                } 
            } else {
                //No previous application exists, so a new one can be created
                $applicationId = JobApplicationController::createJobApplicationWithAnswers($jobApplicationWithAnswers);
                $result = JobApplicationController::getJobApplicationWithAnswersById($applicationId);
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);   
            }
            break;
        case 'OPTIONS':
            //Here Handle OPTIONS/Pre-flight requests
            header("Access-Control-Allow-Headers: accept, content-type");
            header("Access-Control-Allow-Methods: GET,PUT");
            echo("");
            break;
    }