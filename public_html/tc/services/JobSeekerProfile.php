<?php
/**
 * JobSeekerProfile REST API
 */

require_once __DIR__ . '/../config/php.config.inc';

/*set api path*/
set_include_path(get_include_path() . PATH_SEPARATOR);

require_once __DIR__ . '/../config/constants.config.inc';
require_once __DIR__ . '/../controller/JobSeekerController.php';
require_once __DIR__ . '/../controller/AuthenticationController.php';
require_once __DIR__ . '/../model/JobSeekerProfile.php';
require_once __DIR__ . '/../model/JobSeekerProfileAnswer.php';
require_once __DIR__ . '/../model/User.php';
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
                $user_id = Utils::getParameterFromRequest($requestParams,4);
                
                //Admins, and the owning applicant have permission to view
                $userPermissions = [];
                $userPermissions[] = new UserPermission(ROLE_ADMIN);
                $userPermissions[] = new UserPermission(ROLE_APPLICANT, $user_id);
                AuthenticationController::validateUser($userPermissions);
                
                $result = JobSeekerController::getJobSeekerProfileByUserId(intval($user_id));
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            } else {
                $result = array();
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }

            break;
        case 'POST':
            /*
           //must contain access token to get logged in content
            $jsonBody = file_get_contents('php://input');
            if(strlen($requestParams) > 1){
                $jobSeekerProfile = new JobSeekerProfile();
                $user = new User();
                $result = JobSeekerController::createJobSeekerProfile($jobSeekerProfile);
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            } else{
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
            //Here Handle PUT Request
            $jsonBody = file_get_contents('php://input');
            if (strlen($requestParams) > 1) {
                $jobSeekerJSON = json_decode($jsonBody, TRUE);
                //var_dump($jobSeekerJSON);
                $user_id = Utils::getParameterFromRequest($requestParams,4);
                
                //Admins, and the owning applicant have permission to modify
                $userPermissions = [];
                $userPermissions[] = new UserPermission(ROLE_ADMIN);
                $userPermissions[] = new UserPermission(ROLE_APPLICANT, $user_id);
                AuthenticationController::validateUser($userPermissions);
                
                $jobSeekerProfile = new JobSeekerProfile();
                $jobSeekerProfile->setJob_seeker_profile_link($jobSeekerJSON["personal_link"]);
                $jobSeekerProfile->setJob_seeker_profile_twitter_link($jobSeekerJSON["twitter_username"]);
                $jobSeekerProfile->setJob_seeker_profile_linkedin_link($jobSeekerJSON["linkedin_username"]);
                $jobSeekerProfile->setJob_seeker_profile_tagline($jobSeekerJSON["tagline"]);
                $answers = [];
                foreach ($jobSeekerJSON["answers"] as $answerJson) {
                    $answer = new JobSeekerProfileAnswer();
                    $answer->setJob_seeker_profile_question_id($answerJson["job_seeker_profile_question_id"]);
                    $answer->setAnswer($answerJson["answer"]);
                    $answers[] = $answer;
                }
                $jobSeekerProfile->setJob_seeker_profile_answers($answers);
                
                //$user = new User();
                $result = JobSeekerController::addJobSeekerProfile($jobSeekerProfile, $user_id);
                
                //$json = json_encode($result, JSON_PRETTY_PRINT);
                echo($result);
            } else {
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
            header("Access-Control-Allow-Methods: GET,POST,PUT");
            echo("");
            break;
    }

?>