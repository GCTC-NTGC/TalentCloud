<?php

    date_default_timezone_set('America/Toronto');
    error_reporting(E_ALL);
    ini_set("display_errors", 1);
    set_time_limit(0);

    if(!isset($_SESSION)){
        session_start();
    }

    /*set api path*/
    set_include_path(get_include_path() . PATH_SEPARATOR);

    require_once '../controller/ManagerProfileController.php';
    require_once '../model/ManagerProfile.php';
    require_once '../model/ManagerProfileDetails.php';
    require_once '../utils/Utils.php';

    $requestMethod = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_ENCODED);
    $requestURI = urldecode(filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_ENCODED));

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=utf-8");
    header("Accept: application/json");

    $context = '/';

    $requestParams = substr($requestURI,strlen($context));

    switch ($requestMethod) {
        case 'GET':
            if(strlen($requestParams) > 1){
                $locale = Utils::getLocaleFromRequest($requestParams);
                $result = JobPosterController::getJobPostersByLocale($locale);
                $json = json_encode($result, JSON_PRETTY_PRINT);
                header("Content-length:".strlen($json));
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
                $decoded_json = json_decode($jsonBody, TRUE);
                $managerProfileJSON = $decoded_json["manager_profile"];
                
                $managerProfile = new ManagerProfile();
                $managerProfile->setUser_id($managerProfileJSON["user_id"]);
                $managerProfile->setUser_manager_profile_position_id($managerProfileJSON["user_manager_profile_position_id"]);
                $managerProfile->setUser_manager_profile_department_id($managerProfileJSON["user_manager_profile_department_id"]);
                $managerProfile->setUser_manager_profile_branch_id($managerProfileJSON["user_manager_profile_branch_id"]);
                $managerProfile->setUser_manager_profile_division_id($managerProfileJSON["user_manager_profile_division_id"]);
                $managerProfile->setUser_manager_profile_twitter($managerProfileJSON["user_manager_profile_twitter"]);
                $managerProfile->setUser_manager_profile_linkedin($managerProfileJSON["user_manager_profile_linkedin"]);
                
                $managerProfileDetailsJSON = $decoded_json["manager_profile_details"];
                $managerProfileDetails = new ManagerProfileDetails();
                $managerProfileDetails->setLocale_id($managerProfileDetailsJSON["locale_id"]);
                $managerProfileDetails->setUser_manager_profile_details_aboutme($managerProfileDetailsJSON["user_manager_profile_details_aboutme"]);
                $managerProfileDetails->setUser_manager_profile_details_emp_learn($managerProfileDetailsJSON["user_manager_profile_details_emp_learn"]);
                $managerProfileDetails->setUser_manager_profile_details_expectations($managerProfileDetailsJSON["user_manager_profile_details_expectations"]);
                $managerProfileDetails->setUser_manager_profile_details_lead_style($managerProfileDetailsJSON["user_manager_profile_details_lead_style"]);
                $managerProfileDetails->setUser_manager_profile_details_proud($managerProfileDetailsJSON["user_manager_profile_details_proud"]);
                
                $result = ManagerProfileController::createManagerProfile($managerProfile, $managerProfileDetails);
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
                
            break;
        case 'DELETE':
            //Here Handle DELETE Request 
            break;
        case 'PUT':
            //Here Handle PUT Request 
            break;
        case 'OPTIONS':
            //Here Handle OPTIONS/Pre-flight requests
            header("Access-Control-Allow-Headers: accept, content-type");
            header("Access-Control-Allow-Methods: GET");
            echo("");
            break;
    }
   
   ?>