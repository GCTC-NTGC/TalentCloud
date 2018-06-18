<?php

require_once __DIR__ . '/../config/php.config.inc';

/* set api path */
set_include_path(get_include_path() . PATH_SEPARATOR);

require_once __DIR__ . '/../controller/AuthenticationController.php';
require_once __DIR__ . '/../config/constants.config.inc';
require_once __DIR__ . '/../controller/JobApplicationController.php';
require_once __DIR__ . '/../controller/JobPosterController.php';
require_once __DIR__ . '/../model/JobPoster.php';
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
        if (strlen($requestParams) > 1) {

            $locale = Utils::getLocaleFromRequest($requestParams);
            $jobPosterApplicationId = Utils::getParameterFromRequest($requestParams, 5);

            $fullJobApplication = JobApplicationController::getFullJobApplication($jobPosterApplicationId, $locale);

            if ($fullJobApplication === false) {
                //job application not found
                header('HTTP/1.0 404 Not Found');
                echo json_encode(array("failed" => "Requested application does not exist."), JSON_FORCE_OBJECT);
                exit;
            }

            //This is viewable by the owner of the application, the owner of the job poster its for, and admins
            $userId = JobApplicationController::getJobApplicationUserId($jobPosterApplicationId);
            $userPermissions = [];
            $userPermissions[] = new UserPermission(ROLE_ADMIN);
            $userPermissions[] = new UserPermission(ROLE_APPLICANT, $userId);
            //TODO: add permission for manager, owner of job poster
            AuthenticationController::validateUser($userPermissions);

            $json = json_encode($fullJobApplication, JSON_PRETTY_PRINT);
            echo($json);

        } else {
            header('HTTP/1.0 400 Bad Request');
            echo json_encode(array("failed" => 'No request parameters provided'), JSON_FORCE_OBJECT);
            exit;
        }

        break;
    case 'POST':
        break;
    case 'DELETE':
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