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
                break;
            case 'city':
                $lookupData = LookupDAO::getCitiesByLocale($locale);
                break;
            case 'department':
                $lookupData = LookupDAO::getDepartmentsByLocale($locale);
                break;
            case 'division':
                $lookupData = LookupDAO::getDivisionsByLocale($locale);
                break;
            case 'jobterm':
                $lookupData = LookupDAO::getJobTermsByLocale($locale);
                break;
            case 'branch':
                $lookupData = LookupDAO::getBranchesByLocale($locale);
                break;
            case 'skill_level':
                $lookupData = LookupDAO::getSkillLevelsByLocale($locale);
                break;
            case 'experience_level':
                $lookupData = LookupDAO::getExperienceLevelsByLocale($locale);
                break;
            case 'skill':
                $lookupData = LookupDAO::getSkillsByLocale($locale);
                break;
            case 'clearance':
                $lookupData = LookupDAO::getClearanceLevelsByLocale($locale);
                break;
            case 'language':
                $lookupData = LookupDAO::getLanguageLevelsByLocale($locale);
                break;    
            case 'job_seeker_profile_question':
                $lookupData = LookupDao::getJobSeekerProfileQuestionsByLocale($locale);
                break;
        }
        return $lookupData;
    }

}

?>
