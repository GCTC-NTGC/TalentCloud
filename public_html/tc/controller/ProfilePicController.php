<?php

require_once __DIR__ . '/../config/php.config.inc';

/*set api path*/
set_include_path(get_include_path() . PATH_SEPARATOR);

require_once __DIR__ . '/../dao/ProfilePicDAO.php';
require_once __DIR__ . '/../model/ProfilePic.php';


class ProfilePicController {
    
    public static function getProfilePic($user_id) {
        if (ProfilePicDAO::profilePicExistsForUser($user_id)) {
                    return ProfilePicDAO::getProfilePic($user_id);
        } else {
                    return NULL;
        }
    }
    
    public static function putProfilePic($profile_pic) {
        return ProfilePicDAO::putProfilePic($profile_pic);
    }
    
}