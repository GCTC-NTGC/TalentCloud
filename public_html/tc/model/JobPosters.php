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
class JobPosters implements JsonSerializable {
    
    protected $jobs;

    public function __construct() {
        
    }
    
    public function jsonSerialize() {
        return array('jobs' => $this->jobs);
    }
    
    public function getJobs() {
        return $this->jobs;
    }

    public function setJobs($jobs) {
        $this->jobs = $jobs;
        return $this;
    }


}
