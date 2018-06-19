<?php

require_once __DIR__ . '/../config/php.config.inc';

/* set api path */
set_include_path(get_include_path() . PATH_SEPARATOR);

require_once __DIR__ . '/../controller/AuthenticationController.php';
require_once __DIR__ . '/../controller/MicroReferenceController.php';
require_once __DIR__ . '/../controller/JobApplicationController.php';
require_once __DIR__ . '/../model/MicroReference.php';
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
            $locale = Utils::getLocaleFromRequest($requestParams);
            $jobPosterApplicationId = Utils::getParameterFromRequest($requestParams, 5);
            
            //This is viewable by the owner of the application, the owner of the job poster its for, and admins
            $userId = JobApplicationController::getJobApplicationUserId($jobPosterApplicationId);
            $userPermissions = [];
            $userPermissions[] = new UserPermission(ROLE_ADMIN);
            $userPermissions[] = new UserPermission(ROLE_APPLICANT, $userId);
            //TODO: add permission for manager, owner of job poster
            AuthenticationController::validateUser($userPermissions);
            
            $result = MicroReferenceController::getAllMicroReferencesForJobApplication($jobPosterApplicationId, $locale);
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
        //TODO: authenticate user

        if (strlen($requestParams) > 1) {
            $jobPosterApplicationId = Utils::getParameterFromRequest($requestParams, 4);
            $criteriaId = Utils::getParameterFromRequest($requestParams, 6);
            
            //This is modifiable by the owner of the application, and admins
            $userId = JobApplicationController::getJobApplicationUserId($jobPosterApplicationId);
            $userPermissions = [];
            $userPermissions[] = new UserPermission(ROLE_ADMIN);
            $userPermissions[] = new UserPermission(ROLE_APPLICANT, $userId);
            //TODO: add permission for manager, owner of job poster
            AuthenticationController::validateUser($userPermissions);

            //TODO: ensure application exists
            //TODO: ensure criteriaId is valid for application

            if (JobApplicationController::jobApplicationIsDraft($jobPosterApplicationId)) {
                $result = MicroReferenceController::removeMicroReferenceFromJobApplication($jobPosterApplicationId, $criteriaId);

                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            } else {
                header('HTTP/1.0 403 Forbidden');
                echo json_encode(array("failed" => "Only Draft applications can be modified."), JSON_FORCE_OBJECT);
                exit;
            }
        } else {
            $result = array();
            $json = json_encode($result, JSON_PRETTY_PRINT);
            echo($json);
        }
        break;
    case 'PUT':
        //TODO: authenticate user

        if (strlen($requestParams) > 1) {
            $jobPosterApplicationId = Utils::getParameterFromRequest($requestParams, 4);
            $criteriaId = Utils::getParameterFromRequest($requestParams, 6);
            
            //This is modifiable by the owner of the application, and admins
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

                $microReference = new MicroReference();
                $microReference->setMicro_reference_name($payload['name']);
                $microReference->setMicro_reference_email($payload['email']);
                $microReference->setRelationship($payload['relationship']);
                $microReference->setObserved_from_date($payload['observed_from_date']);
                $microReference->setObserved_until_date($payload['observed_until_date']);
                $microReference->setExperience_level($payload['experience_level']);
                $microReference->setMicro_reference_story($payload['story']);

                $result = MicroReferenceController::putMicroReferenceForJobApplication($jobPosterApplicationId, $criteriaId, $microReference);

                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            } else {
                header('HTTP/1.0 403 Forbidden');
                echo json_encode(array("failed" => "Only Draft applications can be modified."), JSON_FORCE_OBJECT);
                exit;
            }
        } else {
            $result = array();
            $json = json_encode($result, JSON_PRETTY_PRINT);
            echo($json);
        }
        break;
    case 'OPTIONS':
        //Here Handle OPTIONS/Pre-flight requests
        header("Access-Control-Allow-Headers: accept, content-type");
        header("Access-Control-Allow-Methods: GET,PUT,DELETE");
        echo("");
        break;
}