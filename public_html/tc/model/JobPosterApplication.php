<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of JobPosting
 *
 * @author GBowden
 */
class JobPosterApplication implements JsonSerializable {
    
    private $job_poster_application_id;
    private $application_job_poster_id;
    private $application_job_seeker_profile_id;
    private $job_poster_application_status_id;
    
    public function __construct($job_poster_application_id = null, $application_job_poster_id = null, $application_job_seeker_profile_id = null, $job_poster_application_status_id = null) {
        $this->job_poster_application_id = $job_poster_application_id;
        $this->application_job_poster_id = $application_job_poster_id;
        $this->application_job_seeker_profile_id = $application_job_seeker_profile_id;
        $this->job_poster_application_status_id = $job_poster_application_status_id;
    }

    public function jsonSerialize() {
        $getter_names = get_class_methods(get_class($this));
        $gettable_attributes = array();
        foreach ($getter_names as $key => $value) {
            if (substr($value, 0, 3) === 'get') {
                $gettable_attributes[strtolower(substr($value, 3, strlen($value)))] = $this->$value();
            }
        }
        return $gettable_attributes;
    }
    
    public function getJob_poster_application_id() {
        return $this->job_poster_application_id;
    }

    public function getApplication_job_poster_id() {
        return $this->application_job_poster_id;
    }

    public function getApplication_job_seeker_profile_id() {
        return $this->application_job_seeker_profile_id;
    }

    public function setJob_poster_application_id($job_poster_application_id) {
        $this->job_poster_application_id = $job_poster_application_id;
    }

    public function setApplication_job_poster_id($application_job_poster_id) {
        $this->application_job_poster_id = $application_job_poster_id;
    }

    public function setApplication_job_seeker_profile_id($application_job_seeker_profile_id) {
        $this->application_job_seeker_profile_id = $application_job_seeker_profile_id;
    }

    public function getJob_poster_application_status_id() {
        return $this->job_poster_application_status_id;
    }

    public function setJob_poster_application_status_id($job_poster_application_status_id) {
        $this->job_poster_application_status_id = $job_poster_application_status_id;
    }


    
}

?>
