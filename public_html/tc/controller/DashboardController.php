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

require_once '../dao/DashboardDAO.php';

/**
 * 
 */
class  DashboardController {

    /**
     * 
     * @param int $user_id
     * @param string $locale
     * @return Object $result
     */
    public static function getDashboardByUserId($user_id, $locale) {
        $result = DashboardDAO::getDashboardByUserId($user_id, $locale);
        return $result;
    }

}