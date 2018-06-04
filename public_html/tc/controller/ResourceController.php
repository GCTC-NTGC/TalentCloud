<?php

date_default_timezone_set('America/Toronto');
error_reporting(E_ALL);
ini_set("display_errors", 1);
set_time_limit(0);

if (!isset($_SESSION)) {
    session_start();
}

/*set api path*/
set_include_path(get_include_path() . PATH_SEPARATOR);

//var_dump($locale);
require_once __DIR__ .'/../dao/ResourceDAO.php';
require_once("resources/" . $locale->getIso_code() . "/resources_common.php");
require_once("resources/resources_db.php");

/**
 * 
 */
class ResourceController {

    /**
     * 
     * @global type $commonLabelArray
     * @param string $locale
     * @param type $resourceKey
     * @param type $keyOption
     * @return type
     */
    public static function getCommonResourceLabel($resourceKey, $keyOption) {
        global $commonLabelArray;
        //print_r("Get common label for locale ".$locale." == ".$resourceKey);

        if ($resourceKey != null && !empty($resourceKey)) {
            if ($keyOption != null) {
                return $commonLabelArray[$resourceKey][$keyOption];
            } else {
                return $commonLabelArray[$resourceKey];
            }
        }
    }

    /**
     * 
     * @global type $labelArray
     * @param string $locale
     * @param type $resourceKey
     * @param type $keyOption
     * @return type
     */
    public static function getResourceLabel($resourceKey, $keyOption) {
        global $labelArray;

        if ($resourceKey != null && !empty($resourceKey)) {
            if ($keyOption != null) {
                return $labelArray[$resourceKey][$keyOption];
            } else {
                return $labelArray[$resourceKey];
            }
        }
    }

    /**
     * 
     * @global type $dbResourcesArray
     * @return type
     */
    public static function getDBResources() {
        global $dbResourcesArray;
        $dbResourcesArray = ResourceDAO::getDBResources();
        return $dbResourcesArray;
    }

    /**
     * 
     * @param type $key
     * @return type
     */
    public static function getdbResourceByKey($locale, $resourceKey, $keyOption) {
        $dbResourcesArray = ResourceDAO::getDBResources();
        //print_r("Get db resource label for locale ".$locale." == ".$resourceKey);

        foreach ($dbResourcesArray as $dbResource) {
            if ($dbResource["resource_key"] == $resourceKey) {
                return($dbResource["resource_value"]);
            }
        }
    }

}

?>