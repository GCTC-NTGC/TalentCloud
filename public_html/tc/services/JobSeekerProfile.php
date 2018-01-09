<?php
/**
 * JobSeekerProfile REST API
 */

date_default_timezone_set('America/Toronto');
error_reporting(E_ALL);
ini_set("display_errors", 1);
set_time_limit(0);

if(!isset($_SESSION)){
    session_start();
}

/*set api path*/
set_include_path(get_include_path(). PATH_SEPARATOR);

require_once '../controller/JobSeekerController.php';
require_once '../model/JobSeekerProfile.php';
require_once '../model/User.php';
require_once '../utils/Utils.php';

$requestMethod = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_ENCODED);
$requestURI = urldecode(filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_ENCODED));
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

    $context = '/';

    $requestParams = substr($requestURI,strlen($context));
    
    switch ($requestMethod) {
        case 'GET':
            if(strlen($requestParams) > 1){
                $user_id = Utils::getParameterFromRequest($requestParams,4);
                $result = JobSeekerController::getJobSeekerProfileByUserId(intval($user_id));
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }else{
                $result = array();
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }

            break;
        case 'POST':
           //must contain access token to get logged in content
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

            break;
        case 'DELETE':
            //Here Handle DELETE Request
            break;
        case 'PUT':
            //Here Handle PUT Request
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
            break;
        case 'PATCH':
            //Here Handle PATCH Request
            break;
        case 'OPTIONS':
            //Here Handle OPTIONS/Pre-flight requests
            header("Access-Control-Allow-Headers: accept, content-type");
            header("Access-Control-Allow-Methods: GET,POST,PUT");
            echo("");
            break;
    }

?>