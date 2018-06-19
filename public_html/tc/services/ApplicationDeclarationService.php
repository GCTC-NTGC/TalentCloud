<?php
    require_once __DIR__ . '/../config/php.config.inc';

    /*set api path*/
    set_include_path(get_include_path() . PATH_SEPARATOR);
    
    
    require_once __DIR__ . '/../controller/AuthenticationController.php';
    require_once __DIR__ . '/../controller/SkillDeclarationController.php';
    require_once __DIR__ . '/../controller/JobApplicationController.php';
    require_once __DIR__ . '/../model/SkillDeclaration.php';
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
            if(strlen($requestParams) > 1){
                $jobPosterApplicationId = Utils::getParameterFromRequest($requestParams,4);
                
                //This is viewable by the owner of the application, the owner of the job poster its for, and admins
                $userId = JobApplicationController::getJobApplicationUserId($jobPosterApplicationId);
                $userPermissions = [];
                $userPermissions[] = new UserPermission(ROLE_ADMIN);
                $userPermissions[] = new UserPermission(ROLE_APPLICANT, $userId);
                //TODO: add permission for manager, owner of job poster
                AuthenticationController::validateUser($userPermissions);
                
                $result = SkillDeclarationController::getAllSkillDeclarationsForJobApplication($jobPosterApplicationId);
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            } else {
                header('HTTP/1.0 400 Bad Request');
                echo json_encode(array("failed"=>'No request parameters provided'),JSON_FORCE_OBJECT);
                exit;
            }
            break;
        case 'POST':
            break;
        case 'DELETE':            
            if(strlen($requestParams) > 1){
                $jobPosterApplicationId = Utils::getParameterFromRequest($requestParams,4);
                $criteriaId = Utils::getParameterFromRequest($requestParams,6);
                
                //This action is available to the owner of the application, the owner of the job poster its for, and admins
                $userId = JobApplicationController::getJobApplicationUserId($jobPosterApplicationId);
                $userPermissions = [];
                $userPermissions[] = new UserPermission(ROLE_ADMIN);
                $userPermissions[] = new UserPermission(ROLE_APPLICANT, $userId);
                //TODO: add permission for manager, owner of job poster
                AuthenticationController::validateUser($userPermissions);
                
                if (JobApplicationController::jobApplicationIsDraft($jobPosterApplicationId)) {
                    $result = SkillDeclarationController::removeSkillDeclarationFromJobApplication($jobPosterApplicationId, $criteriaId);
                
                    $json = json_encode($result, JSON_PRETTY_PRINT);
                    echo($json);
                } else {
                    header('HTTP/1.0 403 Forbidden');
                    echo json_encode(array("failed"=>"Only Draft applications can be modified."), JSON_FORCE_OBJECT);
                    exit;
                }
               
                
            } else {
                header('HTTP/1.0 400 Bad Request');
                echo json_encode(array("failed"=>'No request parameters provided'),JSON_FORCE_OBJECT);
                exit;
            }
            break;
        case 'PUT':            
            if(strlen($requestParams) > 1){
                $jobPosterApplicationId = Utils::getParameterFromRequest($requestParams,4);
                $criteriaId = Utils::getParameterFromRequest($requestParams,6);
                
                 //This action is available to the owner of the application, the owner of the job poster its for, and admins
                $userId = JobApplicationController::getJobApplicationUserId($jobPosterApplicationId);
                $userPermissions = [];
                $userPermissions[] = new UserPermission(ROLE_ADMIN);
                $userPermissions[] = new UserPermission(ROLE_APPLICANT, $userId);
                //TODO: add permission for manager, owner of job poster
                AuthenticationController::validateUser($userPermissions);
                
                //TODO: ensure application exists
                //TODO: ensure criteriaId is valid for application
                
                if (JobApplicationController::jobApplicationIsDraft($jobPosterApplicationId)) {
                    $jsonBody = file_get_contents('php://input');
                    $payload = json_decode($jsonBody, TRUE);

                    $skillDeclaration = new SkillDeclaration();
                    //$skillDeclaration->setSkill_declaration_id($payload["skill_declaration_id"]);
                    $skillDeclaration->setExperience_level_id($payload["experience_level_id"]);
                    $skillDeclaration->setSkill_level_id($payload["skill_level_id"]);
                    $skillDeclaration->setDescription($payload["description"]);
                    //$skillDeclaration->setLast_updated($payload["last_updated"]);

                    $result = SkillDeclarationController::putSkillDeclarationForJobApplication($jobPosterApplicationId, $criteriaId, $skillDeclaration);

                    $json = json_encode($result, JSON_PRETTY_PRINT);
                    echo($json);
                } else {
                    header('HTTP/1.0 403 Forbidden');
                    echo json_encode(array("failed"=>"Only Draft applications can be modified."), JSON_FORCE_OBJECT);
                    exit;
                }        
                
            } else {
                header('HTTP/1.0 400 Bad Request');
                echo json_encode(array("failed"=>'No request parameters provided'),JSON_FORCE_OBJECT);
                exit;
            }
            break;
        case 'OPTIONS':
            //Here Handle OPTIONS/Pre-flight requests
            header("Access-Control-Allow-Headers: accept, content-type");
            header("Access-Control-Allow-Methods: GET,PUT,DELETE");
            echo("");
            break;
    }