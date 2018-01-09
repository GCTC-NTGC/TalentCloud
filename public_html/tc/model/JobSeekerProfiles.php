<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class JobSeekerProfiles{
    
    private $jobSeekerProfiles;
    
    public function __construct($jobSeekerProfiles) {
        $this->jobSeekerProfiles = $jobSeekerProfiles;
    }

    public function getJobSeekerProfiles() {
        return $this->jobSeekerProfiles;
    }

    public function setJobSeekerProfiles($jobSeekerProfiles) {
        $this->jobSeekerProfiles = $jobSeekerProfiles;
        return $this;
    }
    
}

?>