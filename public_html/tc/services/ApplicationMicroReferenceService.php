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

require_once '../controller/MicroReferenceController.php';
require_once '../model/MicroReference.php';
require_once '../utils/Utils.php';

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

            //TODO: ensure application exists
            //TODO: ensure application is in draft status
            //TODO: ensure criteriaId is valid for application

            $result = MicroReferenceController::removeMicroReferenceFromJobApplication($jobPosterApplicationId, $criteriaId);

            $json = json_encode($result, JSON_PRETTY_PRINT);
            echo($json);
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

            //TODO: ensure application exists
            //TODO: ensure application is in draft status
            //TODO: ensure criteriaId is valid for application

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