<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class JobSeekerProfile implements JsonSerializable{
    
    private $job_seeker_profile_id;
    private $job_seeker_profile_link;
    private $job_seeker_profile_accomp;
    private $job_seeker_profile_best_exp;
    private $job_seeker_profile_worst_exp;
    private $job_seeker_profile_superpower;
    private $job_seeker_profile_tagline;
    private $job_seeker_profile_twitter_link;
    private $job_seeker_profile_linkedin_link;
    private $job_seeker_profile_about_me;
    private $last_updated;
    
    public function __construct($job_seeker_profile_id, $job_seeker_profile_link, $job_seeker_profile_accomp, $job_seeker_profile_best_exp, $job_seeker_profile_worst_exp, $job_seeker_profile_superpower, $job_seeker_profile_tagline, $job_seeker_profile_twitter_link, $job_seeker_profile_linkedin_link, $job_seeker_profile_about_me, $last_updated) {
        $this->job_seeker_profile_id = $job_seeker_profile_id;
        $this->job_seeker_profile_link = $job_seeker_profile_link;
        $this->job_seeker_profile_accomp = $job_seeker_profile_accomp;
        $this->job_seeker_profile_best_exp = $job_seeker_profile_best_exp;
        $this->job_seeker_profile_worst_exp = $job_seeker_profile_worst_exp;
        $this->job_seeker_profile_superpower = $job_seeker_profile_superpower;
        $this->job_seeker_profile_tagline = $job_seeker_profile_tagline;
        $this->job_seeker_profile_twitter_link = $job_seeker_profile_twitter_link;
        $this->job_seeker_profile_linkedin_link = $job_seeker_profile_linkedin_link;
        $this->job_seeker_profile_about_me = $job_seeker_profile_about_me;
        $this->last_updated = $last_updated;
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

    public function getJob_seeker_profile_link() {
        return $this->job_seeker_profile_link;
    }

    public function getJob_seeker_profile_accomp() {
        return $this->job_seeker_profile_accomp;
    }

    public function getJob_seeker_profile_best_exp() {
        return $this->job_seeker_profile_best_exp;
    }

    public function getJob_seeker_profile_worst_exp() {
        return $this->job_seeker_profile_worst_exp;
    }

    public function getJob_seeker_profile_superpower() {
        return $this->job_seeker_profile_superpower;
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

    public function getJob_seeker_profile_about_me() {
        return $this->job_seeker_profile_about_me;
    }

    public function getLast_updated() {
        return $this->last_updated;
    }

    public function setJob_seeker_profile_id($job_seeker_profile_id) {
        $this->job_seeker_profile_id = $job_seeker_profile_id;
        return $this;
    }

    public function setJob_seeker_profile_link($job_seeker_profile_link) {
        $this->job_seeker_profile_link = $job_seeker_profile_link;
        return $this;
    }

    public function setJob_seeker_profile_accomp($job_seeker_profile_accomp) {
        $this->job_seeker_profile_accomp = $job_seeker_profile_accomp;
        return $this;
    }

    public function setJob_seeker_profile_best_exp($job_seeker_profile_best_exp) {
        $this->job_seeker_profile_best_exp = $job_seeker_profile_best_exp;
        return $this;
    }

    public function setJob_seeker_profile_worst_exp($job_seeker_profile_worst_exp) {
        $this->job_seeker_profile_worst_exp = $job_seeker_profile_worst_exp;
        return $this;
    }

    public function setJob_seeker_profile_superpower($job_seeker_profile_superpower) {
        $this->job_seeker_profile_superpower = $job_seeker_profile_superpower;
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

    public function setJob_seeker_profile_about_me($job_seeker_profile_about_me) {
        $this->job_seeker_profile_about_me = $job_seeker_profile_about_me;
        return $this;
    }

    public function setLast_updated($last_updated) {
        $this->last_updated = $last_updated;
        return $this;
    }    
}