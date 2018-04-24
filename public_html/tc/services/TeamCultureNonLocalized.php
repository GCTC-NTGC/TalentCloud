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
    
    require_once '../controller/TeamCultureController.php';
    require_once '../controller/UserController.php';
    require_once '../model/TeamCultureNonLocalized.php';
    require_once '../utils/Utils.php';
    require_once '../utils/JWTUtils.php';

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
                $managerProfileId = Utils::getParameterFromRequest($requestParams, 4);
                
                $result = TeamCultureController::getTeamCultureNonLocalizedByManagerProfileId($managerProfileId);
                $json = json_encode($result, JSON_PRETTY_PRINT);
                echo($json);
            }else{
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
            if(isset($_SERVER["HTTP_AUTHORIZATION"])){
                $jwt = JWTUtils::getTokenFromRequest($_SERVER["HTTP_AUTHORIZATION"]);
            
                if(strlen($requestParams) > 1){
                    
                    $managerProfileId = Utils::getParameterFromRequest($requestParams,4);

                    if(strlen($managerProfileId) > 0){

                        $user = UserController::getUserByManagerProfileId($managerProfileId);

                        if(JWTUtils::validateJWT($jwt, $user)){  
                            $json = json_decode(file_get_contents('php://input'), TRUE);

                            $teamCulture = new TeamCultureNonLocalized();
                            $teamCulture->setTeam_size($json['team_size']);
                            $teamCulture->setGc_directory_url($json['gc_directory_url']);
                            $teamCulture->setNarrative_text_en($json['narrative_text_en']);
                            $teamCulture->setNarrative_text_fr($json['narrative_text_fr']);
                           
                            $result = TeamCultureController::setTeamCultureByManagerProfileId($teamCulture, $managerProfileId);
                            $resultJson = json_encode($result, JSON_PRETTY_PRINT);
                            echo($resultJson);                
                            
                        }else{
                            header('HTTP/1.0 401 Unauthorized');
                            echo json_encode(array("failed"=>"Invalid token"),JSON_FORCE_OBJECT);
                            exit;
                        }

                    }else{
                        header('HTTP/1.0 401 Unauthorized');
                        echo json_encode(array("failed"=>"No manager profile id provided"),JSON_FORCE_OBJECT);
                        exit;
                    }
                }else{
                    header('HTTP/1.0 401 Unauthorized');
                    echo json_encode(array("failed"=>'Invalid token, please reauthorize user'),JSON_FORCE_OBJECT);
                    exit;
                }
            }else{
                header('HTTP/1.0 401 Unauthorized');
                echo json_encode(array("failed"=>'No authorization token provided'),JSON_FORCE_OBJECT);
                exit;
            }
            break;
        case 'OPTIONS':
            //Here Handle OPTIONS/Pre-flight requests
            header("Access-Control-Allow-Headers: accept, content-type");
            header("Access-Control-Allow-Methods: GET,POST,PUT");
            break;
    }