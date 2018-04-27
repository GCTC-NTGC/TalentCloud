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
    require_once ROOT_PATH.'model/ManagerProfileDetailsNonLocalized.php';
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
                $managerProfile->setUser_manager_profile_department_id($managerProfileJSON["user_manager_profile_department_id"]);
                $managerProfile->setUser_manager_profile_twitter($managerProfileJSON["user_manager_profile_twitter"]);
                $managerProfile->setUser_manager_profile_linkedin($managerProfileJSON["user_manager_profile_linkedin"]);
                //var_dump($managerProfile);

                $en = "en_CA";
                $fr = "fr_CA";
                $managerProfileDetailsJSON = $decoded_json["manager_profile_details"];
                $detailsEn = $managerProfileDetailsJSON[$en];
                $detailsFr = $managerProfileDetailsJSON[$fr];
                
                $managerProfileDetails = new ManagerProfileDetailsNonLocalized();
                
                $managerProfileDetails->setLocale_id($detailsEn["user_manager_profile_details_locale_id"]);
                $managerProfileDetails->setUser_manager_profile_id($detailsEn["user_manager_profile_id"]);
                $managerProfileDetails->setUser_manager_profile_details_aboutme($detailsEn["user_manager_profile_details_aboutme"]);
                $managerProfileDetails->setUser_manager_profile_details_aboutme_fr($detailsFr["user_manager_profile_details_aboutme"]);
                $managerProfileDetails->setUser_manager_profile_details_branch($detailsEn["user_manager_profile_details_branch"]);
                $managerProfileDetails->setUser_manager_profile_details_branch_fr($detailsFr["user_manager_profile_details_branch"]);
                $managerProfileDetails->setUser_manager_profile_details_division($detailsEn["user_manager_profile_details_division"]);
                $managerProfileDetails->setUser_manager_profile_details_division_fr($detailsFr["user_manager_profile_details_division"]);
                $managerProfileDetails->setUser_manager_profile_details_position($detailsEn["user_manager_profile_details_position"]);
                $managerProfileDetails->setUser_manager_profile_details_position_fr($detailsFr["user_manager_profile_details_position"]);
                $managerProfileDetails->setUser_manager_profile_details_emp_learn($detailsEn["user_manager_profile_details_emp_learn"]);
                $managerProfileDetails->setUser_manager_profile_details_emp_learn_fr($detailsFr["user_manager_profile_details_emp_learn"]);
                $managerProfileDetails->setUser_manager_profile_details_expectations($detailsEn["user_manager_profile_details_expectations"]);
                $managerProfileDetails->setUser_manager_profile_details_expectations_fr($detailsFr["user_manager_profile_details_expectations"]);
                $managerProfileDetails->setUser_manager_profile_details_lead_style($detailsEn["user_manager_profile_details_lead_style"]);
                $managerProfileDetails->setUser_manager_profile_details_lead_style_fr($detailsFr["user_manager_profile_details_lead_style"]);
                $managerProfileDetails->setUser_manager_profile_details_proud($detailsEn["user_manager_profile_details_proud"]);
                $managerProfileDetails->setUser_manager_profile_details_proud_fr($detailsFr["user_manager_profile_details_proud"]);
                $managerProfileDetails->setUser_manager_profile_review_options($detailsEn['user_manager_profile_review_options']);
                $managerProfileDetails->setUser_manager_profile_staylate($detailsEn['user_manager_profile_staylate']);
                $managerProfileDetails->setUser_manager_profile_engage($detailsEn['user_manager_profile_engage']);
                $managerProfileDetails->setUser_manager_profile_devops($detailsEn['user_manager_profile_devops']);
                $managerProfileDetails->setUser_manager_profile_lvwRequests($detailsEn['user_manager_profile_lvwrequests']);
                $managerProfileDetails->setUser_manager_profile_work_experience($detailsEn['user_manager_profile_work_experience']);
                $managerProfileDetails->setUser_manager_profile_work_experience_fr($detailsFr['user_manager_profile_work_experience']);
                $managerProfileDetails->setUser_manager_profile_education($detailsEn['user_manager_profile_education']);
                $managerProfileDetails->setUser_manager_profile_education_fr($detailsFr['user_manager_profile_education']);

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
