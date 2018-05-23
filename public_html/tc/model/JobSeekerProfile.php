<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once '../model/JobSeekerProfileAnswer.php';

class JobSeekerProfile implements JsonSerializable{
    
    private $job_seeker_profile_id;
    private $job_seeker_profile_name;
    private $job_seeker_profile_email;
    private $job_seeker_profile_link;
    private $job_seeker_profile_tagline;
    private $job_seeker_profile_twitter_link;
    private $job_seeker_profile_linkedin_link;
    private $job_seeker_profile_answers;
    private $last_updated;
    private $user_id;
    
    public function __construct($job_seeker_profile_id=null, $job_seeker_profile_name=null, $job_seeker_profile_email=null, $job_seeker_profile_link=null, $job_seeker_profile_tagline=null, $job_seeker_profile_twitter_link=null, $job_seeker_profile_linkedin_link=null, $last_updated=null, $job_seeker_profile_answers = [], $user_id=null) {
        $this->job_seeker_profile_id = $job_seeker_profile_id;
        $this->job_seeker_profile_name = $job_seeker_profile_name;
        $this->job_seeker_profile_email = $job_seeker_profile_email;
        $this->job_seeker_profile_link = $job_seeker_profile_link;
        $this->job_seeker_profile_tagline = $job_seeker_profile_tagline;
        $this->job_seeker_profile_twitter_link = $job_seeker_profile_twitter_link;
        $this->job_seeker_profile_linkedin_link = $job_seeker_profile_linkedin_link;
        $this->job_seeker_profile_answers = $job_seeker_profile_answers;
        $this->last_updated = $last_updated;
        $this->user_id = $user_id;
    }

     public function jsonSerialize() {
        $getter_names = get_class_methods(get_class($this));
        $gettable_attributes = array();
        foreach ($getter_names as $key => $value) {
            if(substr($value, 0, 3) === 'get') {
                $gettable_attributes[strtolower(substr($value, 3, strlen($value)))] = $this->$value();
            }
        }
        return $gettable_attributes;
    }
    

    public function getJob_seeker_profile_id() {
        return $this->job_seeker_profile_id;
    }
    
    public function getJob_seeker_profile_name() {
        return $this->job_seeker_profile_name;
    }

    public function getJob_seeker_profile_email() {
        return $this->job_seeker_profile_email;
    }

    public function getJob_seeker_profile_link() {
        return $this->job_seeker_profile_link;
    }

    public function getJob_seeker_profile_tagline() {
        return $this->job_seeker_profile_tagline;
    }

    public function getJob_seeker_profile_twitter_link() {
        return $this->job_seeker_profile_twitter_link;
    }

    public function getJob_seeker_profile_linkedin_link() {
        return $this->job_seeker_profile_linkedin_link;
    }

    /**
     * 
     * @return JobSeekerProfileAnswer[]
     */
    public function getJob_seeker_profile_answers() {
        return $this->job_seeker_profile_answers;
    }

    public function getLast_updated() {
        return $this->last_updated;
    }
    public function getUser_id() {
        return $this->user_id;
    }

    public function setJob_seeker_profile_id($job_seeker_profile_id) {
        $this->job_seeker_profile_id = $job_seeker_profile_id;
        return $this;
    }
    
    public function setJob_seeker_profile_name($job_seeker_profile_name) {
        $this->job_seeker_profile_name = $job_seeker_profile_name;
        return $this;
    }

    public function setJob_seeker_profile_email($job_seeker_profile_email) {
        $this->job_seeker_profile_email = $job_seeker_profile_email;
        return $this;
    }

    public function setJob_seeker_profile_link($job_seeker_profile_link) {
        $this->job_seeker_profile_link = $job_seeker_profile_link;
        return $this;
    }

    public function setJob_seeker_profile_tagline($job_seeker_profile_tagline) {
        $this->job_seeker_profile_tagline = $job_seeker_profile_tagline;
        return $this;
    }

    public function setJob_seeker_profile_twitter_link($job_seeker_profile_twitter_link) {
        $this->job_seeker_profile_twitter_link = $job_seeker_profile_twitter_link;
        return $this;
    }

    public function setJob_seeker_profile_linkedin_link($job_seeker_profile_linkedin_link) {
        $this->job_seeker_profile_linkedin_link = $job_seeker_profile_linkedin_link;
        return $this;
    }

    /**
     * 
     * @param JobSeekerProfileAnswer[] $job_seeker_profile_answers
     * @return $this
     */
    public function setJob_seeker_profile_answers($job_seeker_profile_answers) {
        $this->job_seeker_profile_answers = $job_seeker_profile_answers;
        return $this;
    }

    public function setLast_updated($last_updated) {
        $this->last_updated = $last_updated;
        return $this;
    }

    public function setUser_id($user_id) {
        $this->user_id = $user_id;
        return $this;
    }

}