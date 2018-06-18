<?php

require_once __DIR__ . '/../config/php.config.inc';

/*set api path*/
set_include_path(get_include_path() . PATH_SEPARATOR);

require_once __DIR__ . '/../dao/DashboardDAO.php';

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