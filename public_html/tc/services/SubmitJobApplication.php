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
require_once '../controller/UserController.php';
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
        break;
    case 'POST':
        if (isset($_SERVER["HTTP_AUTHORIZATION"])) {
            $jwt = JWTUtils::getTokenFromRequest($_SERVER["HTTP_AUTHORIZATION"]);

            if (strlen($requestParams) > 1) {

                $jobPosterApplicationId = Utils::getParameterFromRequest($requestParams, 4);
                $userId = JobApplicationController::getJobApplicationUserId($jobPosterApplicationId);
                
                if ($userId === false) {
                    //job application not found
                    header('HTTP/1.0 404 Not Found');
                    echo json_encode(array("failed" => "Application does not exist."), JSON_FORCE_OBJECT);
                    exit;
                }           

                if (strlen($userId) > 0) {

                    $user = new User();

                    $user->setUser_id($userId);

                    if (JWTUtils::validateJWT($jwt, $user)) {
                        
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
                        echo json_encode(array("failed" => "Invalid token"), JSON_FORCE_OBJECT);
                        exit;
                    }
                } else {
                    header('HTTP/1.0 401 Unauthorized');
                    echo json_encode(array("failed" => "No user id provided"), JSON_FORCE_OBJECT);
                    exit;
                }
            } else {
                header('HTTP/1.0 401 Unauthorized');
                echo json_encode(array("failed" => 'Invalid arguments provided'), JSON_FORCE_OBJECT);
                exit;
            }
        } else {
            header('HTTP/1.0 401 Unauthorized');
            echo json_encode(array("failed" => 'No authorization token provided'), JSON_FORCE_OBJECT);
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