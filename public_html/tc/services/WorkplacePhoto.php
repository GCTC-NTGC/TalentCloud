<?php
/**
 * WorkplacePhoto REST API
 */

date_default_timezone_set('America/Toronto');
error_reporting(E_ALL);
ini_set("display_errors", 1);
set_time_limit(0);

if (!isset($_SESSION)) {
    session_start();
}

/*set api path*/
set_include_path(get_include_path() . PATH_SEPARATOR);

require_once __DIR__ . '/../controller/WorkEnvironmentController.php';
require_once __DIR__ . '/../controller/UserController.php';
require_once __DIR__ . '/../model/File.php';
require_once __DIR__ . '/../utils/Utils.php';
require_once __DIR__ . '/../utils/JWTUtils.php';

$requestMethod = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_ENCODED);
$requestURI = urldecode(filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_ENCODED));
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

    $context = '/';

    $requestParams = substr($requestURI, strlen($context));
    
    switch ($requestMethod) {
        case 'GET':            
            if (strlen($requestParams) > 1) {
                $managerProfileId = Utils::getParameterFromRequest($requestParams, 4);
                $photoName = Utils::getParameterFromRequest($requestParams, 5);
                
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
            if (isset($_SERVER["HTTP_AUTHORIZATION"])) {
                $jwt = JWTUtils::getTokenFromRequest($_SERVER["HTTP_AUTHORIZATION"]);
            
                if (strlen($requestParams) > 1) {
                    
                    $managerProfileId = Utils::getParameterFromRequest($requestParams, 4);

                    if (strlen($managerProfileId) > 0) {

                        $user = UserController::getUserByManagerProfileId($managerProfileId);

                        if (JWTUtils::validateJWT($jwt, $user)) {  
                            $photoName = Utils::getParameterFromRequest($requestParams, 5);
                                                
                            $workplacePhoto = new File(
                                    file_get_contents('php://input'), 
                                    $_SERVER['CONTENT_TYPE'], 
                                    $_SERVER['CONTENT_LENGTH']); 
                            $result = WorkEnvironmentController::putWorkplacePhotoByManagerProfileAndName($workplacePhoto, $photoName, $managerProfileId);
                            $json = json_encode($result, JSON_PRETTY_PRINT);

                            echo($json);                            
                        } else {
                            header('HTTP/1.0 401 Unauthorized');
                            echo json_encode(array("failed"=>"Invalid token"), JSON_FORCE_OBJECT);
                            exit;
                        }

                    } else {
                        header('HTTP/1.0 401 Unauthorized');
                        echo json_encode(array("failed"=>"No manager profile id provided"), JSON_FORCE_OBJECT);
                        exit;
                    }
                } else {
                    header('HTTP/1.0 401 Unauthorized');
                    echo json_encode(array("failed"=>'Invalid token, please reauthorize user'), JSON_FORCE_OBJECT);
                    exit;
                }
            } else {
                header('HTTP/1.0 401 Unauthorized');
                echo json_encode(array("failed"=>'No authorization token provided'), JSON_FORCE_OBJECT);
                exit;
            }
            
            if (strlen($requestParams) > 1) {
                $managerProfileId = Utils::getParameterFromRequest($requestParams, 4);
                
                //echo('{"profilepic":"upload failed"}');
            } else {
                $result = array();
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
                //echo('{"profilepic":"upload failed"}');
            }
            /*
            $jsonBody = file_get_contents('php://input');
            if(strlen($requestParams) > 1){
                $jobSeekerJSON = json_decode($jsonBody, TRUE);
                //var_dump($jobSeekerJSON);
                $user_id = Utils::getParameterFromRequest($requestParams,4);
                $jobSeekerProfile = new JobSeekerProfile();
                $jobSeekerProfile->setJob_seeker_profile_link($jobSeekerJSON["profile_link"]);
                $jobSeekerProfile->setJob_seeker_profile_accomp($jobSeekerJSON["profile_accomp"]);
                $jobSeekerProfile->setJob_seeker_profile_best_exp($jobSeekerJSON["profile_best_exp"]);
                $jobSeekerProfile->setJob_seeker_profile_worst_exp($jobSeekerJSON["profile_worst_exp"]);
                $jobSeekerProfile->setJob_seeker_profile_superpower($jobSeekerJSON["profile_superpower"]);
                //$user = new User();
                $result = JobSeekerController::addJobSeekerProfile($jobSeekerProfile,$user_id);
                
                //$json = json_encode($result, JSON_PRETTY_PRINT);
                echo($result);
            }else{
                $result = array();
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }
             */
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