<?php

date_default_timezone_set('America/Toronto');
error_reporting(E_ALL);
ini_set("display_errors", 1);
set_time_limit(0);

if (!isset($_SESSION)) {
    session_start();
}

/* set api path */
set_include_path(get_include_path() . PATH_SEPARATOR);

require_once '../controller/JobApplicationController.php';
require_once '../controller/JobPosterController.php';
require_once '../model/JobPoster.php';
require_once '../utils/JWTUtils.php';
require_once '../utils/Utils.php';

$requestMethod = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_ENCODED);
$requestURI = urldecode(filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_ENCODED));

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

$context = '/';
$requestParams = substr($requestURI, strlen($context));

switch ($requestMethod) {
    case 'GET':
        if (isset($_SERVER["HTTP_AUTHORIZATION"])) {
            $jwt = JWTUtils::getTokenFromRequest($_SERVER["HTTP_AUTHORIZATION"]);

            if (strlen($requestParams) > 1) {

                $locale = Utils::getLocaleFromRequest($requestParams);
                $jobPosterApplicationId = Utils::getParameterFromRequest($requestParams, 5);

                $user = JWTUtils::getOpenIdUserFromJWT($jwt);
                
                if (JWTUtils::validateJWT($jwt, $user)) {
                    
                    $fullJobApplication = JobApplicationController::getFullJobApplication($jobPosterApplicationId, $locale);

                    if ($fullJobApplication === false) {
                        //job application not found
                        header('HTTP/1.0 404 Not Found');
                        echo json_encode(array("failed" => "Requested application does not exist."), JSON_FORCE_OBJECT);
                        exit;
                    }
                    
                    if ($user->getUser_role() === "jobseeker") {
                        //a jobseeker has permission if they created this application
                        
                        if ($user->getUser_id() != $fullJobApplication->getJob_seeker_profile()->getUser_id()) {
                            header('HTTP/1.0 401 Unauthorized');
                            echo json_encode(array("failed" => "Requested job application does not belong to this user"), JSON_FORCE_OBJECT);
                            exit;
                        }
                        
                    } else if ($user->getUser_role() === "administrator") {
                        //an administrator has permission if they created the job this application is for
                        
                        $jobPoster = JobPosterController::getJobPosterById($locale, $fullJobApplication->getJob_poster_application()->getApplication_job_poster_id());
                        if ($jobPoster->getManager_user_id() != $user->getUser_id()) {
                            header('HTTP/1.0 401 Unauthorized');
                            echo json_encode(array("failed" => "This user is not authorized to view applications for this job"), JSON_FORCE_OBJECT);
                            exit;
                        }
                        
                    } else {
                        header('HTTP/1.0 401 Unauthorized');
                        echo json_encode(array("failed" => "This user does not have permissions to view job applications"), JSON_FORCE_OBJECT);
                        exit;
                    }            

                    $json = json_encode($fullJobApplication, JSON_PRETTY_PRINT);
                    echo($json);
                } else {
                    header('HTTP/1.0 401 Unauthorized');
                    echo json_encode(array("failed" => "Invalid token"), JSON_FORCE_OBJECT);
                    exit;
                }
            } else {
                header('HTTP/1.0 401 Unauthorized');
                echo json_encode(array("failed" => 'Invalid token, please reauthorize user'), JSON_FORCE_OBJECT);
                exit;
            }
        } else {
            header('HTTP/1.0 401 Unauthorized');
            echo json_encode(array("failed" => 'No authorization token provided'), JSON_FORCE_OBJECT);
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