<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class JobSeeker {
    
    private $user;
    
    private $jobSeekerProfile;
    
    function __construct($user = null, $jobSeekerProfile = null) {
        $this->user = $user;
        $this->jobSeekerProfile = $jobSeekerProfile;
    }

    function getUser() {
        return $this->user;
    }

    function getJobSeekerProfile() {
        return $this->jobSeekerProfile;
    }

    function setUser($user) {
        $this->user = $user;
    }

    function setJobSeekerProfile($jobSeekerProfile) {
        $this->jobSeekerProfile = $jobSeekerProfile;
    }


}
?>