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

require_once '../dao/JobPosterApplicationDAO.php';
require_once '../model/JobPosterApplication.php';

/**
 * 
 */
class  JobPosterApplicationController {
    
    /**
     * 
     * @param string $page_name
     * @param string $locale
     * @return Page object
     */
    public static function addJobPosterApplication($jobPosterId,$jobSeekerProfileId) {
        
        $jobPoster = JobPosterApplicationDAO::addJobPosterApplication($jobPosterId,$jobSeekerProfileId);
        return $jobPoster;
    }
    
    /**
     * 
     * @param string $page_name
     * @param string $locale
     * @return Page object
     */
    public static function getJobPosterApplicationByProfileId($jobPosterId, $jobSeekerProfileId) {
        
        $job_poster_application_id = JobPosterApplicationDAO::getJobPosterApplicationByProfileId($jobPosterId,$jobSeekerProfileId);
        return $job_poster_application_id;
    }

}

?>