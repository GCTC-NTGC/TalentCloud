<?php
/**
 * WorkplacePhoto REST API
 */

require_once __DIR__ . '/../config/php.config.inc';

/*set api path*/
set_include_path(get_include_path() . PATH_SEPARATOR);

require_once __DIR__ . '/../controller/AuthenticationController.php';
require_once __DIR__ . '/../controller/WorkEnvironmentController.php';
require_once __DIR__ . '/../controller/UserController.php';
require_once __DIR__ . '/../model/File.php';
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
            if(strlen($requestParams) > 1){
                //Workplace photos are public, no authentication
                
                $managerProfileId = Utils::getParameterFromRequest($requestParams,4);
                $photoName = Utils::getParameterFromRequest($requestParams,5);
                
                $result = WorkEnvironmentController::getWorkplacePhotoByManagerProfileAndName($photoName, $managerProfileId);
                
                if ($result == NULL) {
                    http_response_code(404);
                    echo('This workplace photo does not exist');
                } else {
                    header("Content-type: " . $result->getMime_type());
                    echo($result->getFile());
                }
            } else {
                $result = array();
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }    
            break;
        case 'POST':
           //must contain access token to get logged in content
            /*
            $jsonBody = file_get_contents('php://input');
            if(strlen($requestParams) > 1){
                $jobSeekerProfile = new JobSeekerProfile();
                $user = new User();
                $result = JobSeekerController::createJobSeekerProfile($jobSeekerProfile);
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }else{
                $result = array();
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }
            */
            break;
        case 'DELETE':
            //Here Handle DELETE Request
            break;
        case 'PUT':
            
            if(strlen($requestParams) > 1){

                $managerProfileId = Utils::getParameterFromRequest($requestParams,4);

                if(strlen($managerProfileId) > 0){

                    $user = UserController::getUserByManagerProfileId($managerProfileId);

                    //Admins, and the owning applicant have permission to modify
                    $userPermissions = [];
                    $userPermissions[] = new UserPermission(ROLE_ADMIN);
                    //TODO: add owning manager permission
                    AuthenticationController::validateUser($userPermissions);

                    $photoName = Utils::getParameterFromRequest($requestParams,5);

                    $workplacePhoto = new File(
                            file_get_contents('php://input'), 
                            $_SERVER['CONTENT_TYPE'], 
                            $_SERVER['CONTENT_LENGTH']); 
                    $result = WorkEnvironmentController::putWorkplacePhotoByManagerProfileAndName($workplacePhoto, $photoName, $managerProfileId);
                    $json = json_encode($result, JSON_PRETTY_PRINT);

                    echo($json);                            
                }else{
                    header('HTTP/1.0 400 Bad Request');
                    echo json_encode(array("failed"=>"No manager profile id provided"),JSON_FORCE_OBJECT);
                    exit;
                }
            }else{
                header('HTTP/1.0 400 Bad Request');
                echo json_encode(array("failed"=>'No request parameters provided'),JSON_FORCE_OBJECT);
                exit;
            }
            
            break;
        case 'PATCH':
            //Here Handle PATCH Request
            break;
        case 'OPTIONS':
            //Here Handle OPTIONS/Pre-flight requests
            header("Access-Control-Allow-Headers: accept, content-type");
            header("Access-Control-Allow-Methods: GET,PUT");
            echo("");
            break;
    }