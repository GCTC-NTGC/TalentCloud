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

require_once '../dao/LookupDAO.php';

/**
 * 
 */
class LookupController {

    /**
     * 
     * @param string $page_name
     * @param string $locale
     * @return Page object
     */
    public static function getLookupDataByLocaleAndType($locale,$dataType) {
        
        switch ($dataType) {
            case 'province':
                $lookupData = LookupDAO::getProvincesByLocale($locale);
                return $lookupData;
            break;
            case 'city':
                $lookupData = LookupDAO::getCitiesByLocale($locale);
                return $lookupData;
            break;
            case 'department':
                $lookupData = LookupDAO::getDepartmentsByLocale($locale);
                return $lookupData;
            break;
            case 'division':
                $lookupData = LookupDAO::getDivisionsByLocale($locale);
                return $lookupData;
            break;
            case 'jobterm':
                $lookupData = LookupDAO::getJobTermsByLocale($locale);
                return $lookupData;
            break;
            case 'branch':
                $lookupData = LookupDAO::getBranchesByLocale($locale);
                return $lookupData;
            break;
        }
    }

}

?>