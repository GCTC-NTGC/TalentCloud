<?php

require_once __DIR__ . '/../config/php.config.inc';

/* set api path */
set_include_path(get_include_path() . PATH_SEPARATOR);

require_once __DIR__ . '/../controller/AuthenticationController.php';
require_once __DIR__ . '/../controller/JobApplicationController.php';
require_once __DIR__ . '/../controller/UserController.php';
require_once __DIR__ . '/../model/UserPermission.php';
require_once __DIR__ . '/../utils/Utils.php';

$requestMethod = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_ENCODED);
$requestURI = urldecode(filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_ENCODED));

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

$context = '/';
$requestParams = substr($requestURI, strlen($context));

switch ($requestMethod) {
    case 'GET':
        break;
    case 'POST':
        
            if (strlen($requestParams) > 1) {

                $jobPosterApplicationId = Utils::getParameterFromRequest($requestParams, 4);
                $userId = JobApplicationController::getJobApplicationUserId($jobPosterApplicationId);
                
                if ($userId === false) {
                    //job application not found
                    header('HTTP/1.0 404 Not Found');
                    echo json_encode(array("failed" => "Application does not exist."), JSON_FORCE_OBJECT);
                    exit;
                }      
                
                //Application owner can submit it (or Admin)
                $userPermissions = [];
                $userPermissions[] = new UserPermission(ROLE_ADMIN);
                $userPermissions[] = new UserPermission(ROLE_APPLICANT, $userId);
                AuthenticationController::validateUser($userPermissions);

                        
                $result = JobApplicationController::submitJobApplication($jobPosterApplicationId);
                        
                if ($result === false) {
                    header('HTTP/1.0 400 Not Found');
                    echo json_encode(array("failed" => "Error occured during submission"), JSON_FORCE_OBJECT);
                    exit;
                }

                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
                        
            } else {
                header('HTTP/1.0 401 Unauthorized');
                echo json_encode(array("failed" => 'Invalid arguments provided'), JSON_FORCE_OBJECT);
                exit;
            }
        
        break;
    case 'DELETE':
        break;
    case 'PUT':
        break;
    case 'OPTIONS':
        //Here Handle OPTIONS/Pre-flight requests
        header("Access-Control-Allow-Headers: accept, content-type");
        header("Access-Control-Allow-Methods: POST");
        echo("");
        break;
}