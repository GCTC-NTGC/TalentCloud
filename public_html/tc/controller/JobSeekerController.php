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

require_once '../dao/JobSeekerDAO.php';
require_once '../model/JobSeekerProfile.php';

/**
 * 
 */
class  JobSeekerController {

    /**
     * 
     * @param string $page_name
     * @param string $locale
     * @return Page object
     */
    public static function getJobSeekerById($job_seeker_profile_id) {
        
    }
    
    /**
     * 
     * @param string $page_name
     * @param string $locale
     * @return Page object
     */
    public static function getJobSeekerProfileByUserId($user_id) {
        $jobSeekerProfile = JobSeekerDAO::getJobSeekerProfileByUserId($user_id);
        return $jobSeekerProfile;
    }
    
    /**
     * 
     * @param string $page_name
     * @param string $locale
     * @return Page object
     */
    public static function addJobSeekerProfile($jobSeekerProfile,$user_id) {
        $newJobSeekerProfile = JobSeekerDAO::addJobSeekerProfile($jobSeekerProfile,$user_id);
        return $newJobSeekerProfile;
    }
    
    public static function getJobSeekers(){
        $jobSeekerProfiles = JobSeekerDAO::getJobSeekers();
        return $jobSeekerProfiles;
    }
    
}

?>