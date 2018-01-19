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

require_once '../dao/ProfilePicDAO.php';
require_once '../model/ProfilePic.php';


class ProfilePicController {
    
    public static function getProfilePic($user_id) {
        return ProfilePicDAO::getProfilePic($user_id);
    }
    
    public static function putProfilePic($profile_pic) {
        return ProfilePicDAO::putProfilePic($profile_pic);
    }
    
}