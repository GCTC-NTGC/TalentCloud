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
    
    require_once '../controller/SkillDeclarationController.php';
    require_once '../model/SkillDeclaration.php';
    require_once '../utils/Utils.php';

    $requestMethod = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_ENCODED);
    $requestURI = urldecode(filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_ENCODED));

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=utf-8");

    $context = '/';

    $requestParams = substr($requestURI,strlen($context));
    //var_dump($requestParams);
    switch ($requestMethod) {
        case 'GET':
            if(strlen($requestParams) > 1){
                $jobPosterApplicationId = Utils::getParameterFromRequest($requestParams,4);
                $result = SkillDeclarationController::getEssentialSkillDeclarationsForJobApplication($jobPosterApplicationId);
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }else{
                $result = array();
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }
            break;
        case 'POST':
            /*
            if(strlen($requestParams) > 1){
                $jobPosterApplicationId = Utils::getParameterFromRequest($requestParams,4);
                
                $jsonBody = file_get_contents('php://input');
                $evidenceJSON = json_decode($jsonBody, TRUE);
                
                $evidence = new SkillDeclaration();
                $evidence->setEvidence_id($evidenceJSON["evidence_id"]);
                $evidence->setSkill_ids($evidenceJSON["skill_ids"]);
                $evidence->setExperience_level_id($evidenceJSON["experience_level_id"]);
                $evidence->setSkill_level_id($evidenceJSON["skill_level_id"]);
                $evidence->setEvidence_description($evidenceJSON["evidence_description"]);
                $evidence->setLast_updated($evidenceJSON["last_updated"]);
                
                $result = SkillDeclarationController::addSkillDeclarationToJobApplication($jobPosterApplicationId, $evidence);
                
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }else{
                $result = array();
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }
             * 
             */
            break;
        case 'DELETE':
            //TODO: authenticate user
            
            if(strlen($requestParams) > 1){
                $jobPosterApplicationId = Utils::getParameterFromRequest($requestParams,4);
                $criteriaId = Utils::getParameterFromRequest($requestParams,6);
               
                $result = SkillDeclarationController::removeEssentialSkillDeclarationFromJobApplication($jobPosterApplicationId, $criteriaId);
                
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }else{
                $result = array();
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }
            break;
        case 'PUT':
            //TODO: authenticate user
            
            if(strlen($requestParams) > 1){
                $jobPosterApplicationId = Utils::getParameterFromRequest($requestParams,4);
                $criteriaId = Utils::getParameterFromRequest($requestParams,6);
                
                //TODO: ensure application exists
                //TODO: ensure application is in draft status
                //TODO: ensure criteriaId is valid for application
                
                $jsonBody = file_get_contents('php://input');
                $payload = json_decode($jsonBody, TRUE);
                
                $skillDeclaration = new SkillDeclaration();
                $evidence->setSkill_declaration_id($payload["skil_declaration_id"]);
                $evidence->setExperience_level_id($payload["experience_level_id"]);
                $evidence->setSkill_level_id($payload["skill_level_id"]);
                $evidence->setDescription($payload["description"]);
                $evidence->setLast_updated($payload["last_updated"]);
                
                $result = SkillDeclarationController::putEssentialSkillDeclarationForJobApplication($jobPosterApplicationId, $criteriaId, $skillDeclaration);
                
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }else{
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