<?php

    require_once __DIR__ . '/../config/php.config.inc';

    /*set api path*/
    set_include_path(get_include_path() . PATH_SEPARATOR);
    
    require_once __DIR__ . '/../controller/AuthenticationController.php';
    require_once __DIR__ . '/../controller/WorkEnvironmentController.php';
    require_once __DIR__ . '/../controller/UserController.php';
    require_once __DIR__ . '/../model/WorkEnvironment.php';
    require_once __DIR__ . '/../model/BasicWorkEnvironment.php';
    require_once __DIR__ . '/../model/WorkplacePhotoCaption.php';
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
            if (strlen($requestParams) > 1) {
                $managerProfileId = Utils::getParameterFromRequest($requestParams, 4);
                
                //Publicly viewable, no authentication
                
                $result = WorkEnvironmentController::getWorkEnivronmentByManagerProfile($managerProfileId);
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
                    
                    $managerProfileId = Utils::getParameterFromRequest($requestParams, 4);

                    if (strlen($managerProfileId) > 0) {

                        $user = UserController::getUserByManagerProfileId($managerProfileId);
                        
                        //The owning manager (and admins) have permission to modify profile
                        $userPermissions = [];
                        $userPermissions[] = new UserPermission(ROLE_ADMIN);
                        //TODO: add manager permission for owner
                        AuthenticationController::validateUser($userPermissions);
 
                        $json = json_decode(file_get_contents('php://input'), TRUE);

                        $basicWorkEnvironment = new BasicWorkEnvironment();
                        //$basicWorkEnvironment->setId($json['id']);
                        $basicWorkEnvironment->setRemote_allowed($json['remote_allowed']);
                        $basicWorkEnvironment->setTelework_allowed($json['telework_allowed']);
                        $basicWorkEnvironment->setFlexible_allowed($json['flexible_allowed']);

                        $photo_captions = [];
                        foreach($json['workplace_photo_captions'] as $captionJson) {
                            $caption = new WorkplacePhotoCaption();
                            //$caption->setWork_environment_id($captionJson['work_environment_id']);
                            $caption->setPhoto_name($captionJson['photo_name']);
                            $caption->setDescription($captionJson['description']);                    
                            $photo_captions[] = $caption;
                        }

                        $workEnvironment = new WorkEnvironment($basicWorkEnvironment, $photo_captions);           

                        $result = WorkEnvironmentController::setWorkEnvironmentByManagerProfile($workEnvironment, $managerProfileId);
                        $resultJson = json_encode($result, JSON_PRETTY_PRINT);
                        echo($resultJson);                
                            
                    }else{
                        header('HTTP/1.0 400 Bad Request');
                        echo json_encode(array("failed"=>"No manager profile id provided"),JSON_FORCE_OBJECT);
                        exit;
                    }
                }else{
                    header('HTTP/1.0 400 Bad Request');
                    echo json_encode(array("failed"=>'"No manager profile id provided"'),JSON_FORCE_OBJECT);
                    exit;
                }
            break;
        case 'OPTIONS':
            //Here Handle OPTIONS/Pre-flight requests
            header("Access-Control-Allow-Headers: accept, content-type");
            header("Access-Control-Allow-Methods: GET,POST,PUT");
            break;
    }