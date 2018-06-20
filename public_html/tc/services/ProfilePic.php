<?php
/**
 * ProfilePic REST API
 */

require_once __DIR__ . '/../config/php.config.inc';

/*set api path*/
set_include_path(get_include_path() . PATH_SEPARATOR);

require_once __DIR__ . '/../controller/ProfilePicController.php';
require_once __DIR__ . '/../controller/AuthenticationController.php';
require_once __DIR__ . '/../model/ProfilePic.php';
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
            if (strlen($requestParams) > 1) {
                $user_id = Utils::getParameterFromRequest($requestParams, 4);
                $result = ProfilePicController::getProfilePic($user_id);
                
                if ($result == NULL) {
                    http_response_code(404);
                    echo('No profile image uploaded for this user.');
                } else {
                    header("Content-type: " . $result->getType());
                    echo($result->getImage());
                }
            }else{
                header('HTTP/1.0 400 Bad Request');
                echo json_encode(array("failed"=>'No request parameters provided'),JSON_FORCE_OBJECT);
                exit;
            }    
            break;
        case 'POST':
           
            break;
        case 'DELETE':
            //Here Handle DELETE Request
            break;
        case 'PUT':            
            if(strlen($requestParams) > 1){
                $user_id = Utils::getParameterFromRequest($requestParams,4);
                                           
                //Admins, and the owning applicant have permission to update
                $userPermissions = [];
                $userPermissions[] = new UserPermission(ROLE_ADMIN);
                $userPermissions[] = new UserPermission(ROLE_APPLICANT, $user_id);
                AuthenticationController::validateUser($userPermissions);
                
                $profile_pic = new ProfilePic($user_id, 
                        file_get_contents('php://input'), 
                        null,
                        $_SERVER['CONTENT_TYPE'], 
                        $_SERVER['CONTENT_LENGTH']); 
                $result = ProfilePicController::putProfilePic($profile_pic);
                
                echo($result);
            }else{
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
            header("Access-Control-Allow-Methods: GET,PUT");
            echo("");
            break;
    }
?>