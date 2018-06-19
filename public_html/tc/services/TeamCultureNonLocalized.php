<?php

    require_once __DIR__ . '/../config/php.config.inc';

    /*set api path*/
    set_include_path(get_include_path() . PATH_SEPARATOR);
    
    require_once __DIR__ . '/../controller/AuthenticationController.php';
    require_once __DIR__ . '/../controller/TeamCultureController.php';
    require_once __DIR__ . '/../controller/UserController.php';
    require_once __DIR__ . '/../model/TeamCultureNonLocalized.php';
    require_once __DIR__ . '/../model/UserPermission.php';
    require_once __DIR__ . '/../utils/Utils.php';

    $requestMethod = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_ENCODED);
    $requestURI = urldecode(filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_ENCODED));

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=utf-8");

    $context = '/';

    $requestParams = substr($requestURI, strlen($context));
    //var_dump($requestParams);
    switch ($requestMethod) {
        case 'GET':
            if(strlen($requestParams) > 1){
                //Team Culture is public, no authentication
                
                $managerProfileId = Utils::getParameterFromRequest($requestParams, 4);

                $result = TeamCultureController::getTeamCultureNonLocalizedByManagerProfileId($managerProfileId);
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
            //Here Handle DELETE Request
            break;
        case 'PUT':
            if(strlen($requestParams) > 1){

                $managerProfileId = Utils::getParameterFromRequest($requestParams,4);

                if(strlen($managerProfileId) > 0){

                    $user = UserController::getUserByManagerProfileId($managerProfileId);

                    //Admins, and the owning manager have permission to modify
                    $userPermissions = [];
                    $userPermissions[] = new UserPermission(ROLE_ADMIN);
                    //TODO: add permission for owning manager
                    AuthenticationController::validateUser($userPermissions);

                    $json = json_decode(file_get_contents('php://input'), TRUE);

                    $teamCulture = new TeamCultureNonLocalized();
                    $teamCulture->setTeam_size($json['team_size']);
                    $teamCulture->setGc_directory_url($json['gc_directory_url']);
                    $teamCulture->setNarrative_text_en($json['narrative_text_en']);
                    $teamCulture->setNarrative_text_fr($json['narrative_text_fr']);
                    $teamCulture->setOperating_context_en($json['operating_context_en']);
                    $teamCulture->setOperating_context_fr($json['operating_context_fr']);
                    $teamCulture->setWhat_we_value_en($json['what_we_value_en']);
                    $teamCulture->setWhat_we_value_fr($json['what_we_value_fr']);
                    $teamCulture->setHow_we_work_en($json['how_we_work_en']);
                    $teamCulture->setHow_we_work_fr($json['how_we_work_fr']);

                    $result = TeamCultureController::setTeamCultureByManagerProfileId($teamCulture, $managerProfileId);
                    $resultJson = json_encode($result, JSON_PRETTY_PRINT);
                    echo($resultJson);


                }else{
                    header('HTTP/1.0 400 Bad Request');
                    echo json_encode(array("failed"=>"No manager profile id provided"),JSON_FORCE_OBJECT);
                    exit;
                }
            }else{
                header('HTTP/1.0 400 Bad Request');
                echo json_encode(array("failed"=>'No request parameters provided'),JSON_FORCE_OBJECT);
                exit;
            }
            
            break;
        case 'OPTIONS':
            //Here Handle OPTIONS/Pre-flight requests
            header("Access-Control-Allow-Headers: accept, content-type");
            header("Access-Control-Allow-Methods: GET,POST,PUT");
            break;
    }
