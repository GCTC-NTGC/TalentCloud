<?php

    date_default_timezone_set('America/Toronto');
    error_reporting(E_ALL);
    ini_set("display_errors", 1);
    set_time_limit(0);

    if(!isset($_SESSION)){
        session_start();
    }

    /*set api path*/
    if(!defined('ROOT_PATH')){
        define('ROOT_PATH', dirname(__DIR__) . '/');
    }

    require_once ROOT_PATH.'controller/ManagerProfileController.php';
    require_once ROOT_PATH.'model/ManagerProfile.php';
    require_once ROOT_PATH.'model/ManagerProfileDetails.php';
    require_once ROOT_PATH.'utils/Utils.php';

    $requestMethod = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_ENCODED);
    $requestURI = urldecode(filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_ENCODED));

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=utf-8");
    header("Accept: application/json");

    $context = '/';

    $requestParams = substr($requestURI,strlen($context));
    $user_id_param_index = 4;
    switch ($requestMethod) {
        case 'GET':
            if(strlen($requestParams) > 1){
                $user_id = Utils::getParameterFromRequest($requestParams, $user_id_param_index);
                $managerProfile = new ManagerProfile();
                $managerProfile->setUser_id($user_id);
                $result = ManagerProfileController::getManagerProfileWithDetails($managerProfile);
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
                $decoded_json = json_decode($jsonBody, TRUE);
                //var_dump($decoded_json);
                $managerProfileJSON = $decoded_json["manager_profile"];
                
                $managerProfile = new ManagerProfile();
                $managerProfile->setUser_id($managerProfileJSON["user_id"]);
                $managerProfile->setUser_manager_profile_id($managerProfileJSON["user_manager_profile_id"]);
                $managerProfile->setUser_manager_profile_position($managerProfileJSON["user_manager_profile_position"]);
                $managerProfile->setUser_manager_profile_department_id($managerProfileJSON["user_manager_profile_department_id"]);
                $managerProfile->setUser_manager_profile_branch_id($managerProfileJSON["user_manager_profile_branch_id"]);
                $managerProfile->setUser_manager_profile_division_id($managerProfileJSON["user_manager_profile_division_id"]);
                $managerProfile->setUser_manager_profile_twitter($managerProfileJSON["user_manager_profile_twitter"]);
                $managerProfile->setUser_manager_profile_linkedin($managerProfileJSON["user_manager_profile_linkedin"]);
                //var_dump($managerProfile);
                
                $managerProfileDetailsJSON = $decoded_json["manager_profile_details"];
                $managerProfileDetails = new ManagerProfileDetails();
                $managerProfileDetails->setLocale_id($managerProfileDetailsJSON["locale_id"]);
                $managerProfileDetails->setUser_manager_profile_id($managerProfileDetailsJSON["user_manager_profile_id"]);
                $managerProfileDetails->setUser_manager_profile_details_aboutme($managerProfileDetailsJSON["user_manager_profile_details_aboutme"]);
                $managerProfileDetails->setUser_manager_profile_details_emp_learn($managerProfileDetailsJSON["user_manager_profile_details_emp_learn"]);
                $managerProfileDetails->setUser_manager_profile_details_expectations($managerProfileDetailsJSON["user_manager_profile_details_expectations"]);
                $managerProfileDetails->setUser_manager_profile_details_lead_style($managerProfileDetailsJSON["user_manager_profile_details_lead_style"]);
                $managerProfileDetails->setUser_manager_profile_details_proud($managerProfileDetailsJSON["user_manager_profile_details_proud"]);
                $managerProfileDetails->setUser_manager_profile_review_options($managerProfileDetailsJSON['user_manager_profile_review_options']);
                $managerProfileDetails->setUser_manager_profile_staylate($managerProfileDetailsJSON['user_manager_profile_staylate']);
                $managerProfileDetails->setUser_manager_profile_engage($managerProfileDetailsJSON['user_manager_profile_engage']);
                $managerProfileDetails->setUser_manager_profile_devops($managerProfileDetailsJSON['user_manager_profile_devops']);
                $managerProfileDetails->setUser_manager_profile_lvwRequests($managerProfileDetailsJSON['user_manager_profile_lvwrequests']);
                $managerProfileDetails->setUser_manager_profile_work_experience($managerProfileDetailsJSON['user_manager_profile_work_experience']);
                $managerProfileDetails->setUser_manager_profile_education($managerProfileDetailsJSON['user_manager_profile_education']);
                
                //var_dump($managerProfileDetailsJSON);
                
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