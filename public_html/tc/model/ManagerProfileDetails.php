<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class ManagerProfileDetails implements JsonSerializable{

    private $user_manager_profile_details_id;
    private $locale_id;
    private $user_manager_profile_details_aboutme;
    private $user_manager_profile_details_proud;
    private $user_manager_profile_details_branch;
    private $user_manager_profile_details_division;
    private $user_manager_profile_details_position;
    private $user_manager_profile_details_lead_style;
    private $user_manager_profile_details_emp_learn;
    private $user_manager_profile_details_expectations;
    private $user_manager_profile_id;
    private $user_manager_profile_review_options;
    private $user_manager_profile_staylate;
    private $user_manager_profile_engage;
    private $user_manager_profile_devops;
    private $user_manager_profile_lvwRequests;
    private $user_manager_profile_work_experience;
    private $user_manager_profile_education;

    public function __construct(
            $user_manager_profile_details_id = null,
            $locale_id = null,
            $user_manager_profile_details_aboutme = null,
            $user_manager_profile_details_proud = null,
            $user_manager_profile_details_branch = null,
            $user_manager_profile_details_division = null,
            $user_manager_profile_details_position = null,
            $user_manager_profile_details_lead_style = null,
            $user_manager_profile_details_emp_learn = null,
            $user_manager_profile_details_expectations = null,
            $user_manager_profile_id = null,
            $user_manager_profile_review_options = null,
            $user_manager_profile_staylate = null,
            $user_manager_profile_engage = null,
            $user_manager_profile_devops = null,
            $user_manager_profile_lvwRequests = null,
            $user_manager_profile_work_experience = null,
            $user_manager_profile_education = null
            ) {
        $this->user_manager_profile_details_id = $user_manager_profile_details_id;
        $this->locale_id = $locale_id;
        $this->user_manager_profile_details_aboutme = $user_manager_profile_details_aboutme;
        $this->user_manager_profile_details_proud = $user_manager_profile_details_proud;
        $this->user_manager_profile_details_branch = $user_manager_profile_details_branch;
        $this->user_manager_profile_details_division = $user_manager_profile_details_division;
        $this->user_manager_profile_details_position = $user_manager_profile_details_position;
        $this->user_manager_profile_details_lead_style = $user_manager_profile_details_lead_style;
        $this->user_manager_profile_details_emp_learn = $user_manager_profile_details_emp_learn;
        $this->user_manager_profile_details_expectations = $user_manager_profile_details_expectations;
        $this->user_manager_profile_id = $user_manager_profile_id;
        $this->user_manager_profile_review_options = $user_manager_profile_review_options;
        $this->user_manager_profile_staylate = $user_manager_profile_staylate;
        $this->user_manager_profile_engage = $user_manager_profile_engage;
        $this->user_manager_profile_devops = $user_manager_profile_devops;
        $this->user_manager_profile_lvwRequests = $user_manager_profile_lvwRequests;
        $this->user_manager_profile_work_experience = $user_manager_profile_work_experience;
        $this->user_manager_profile_education = $user_manager_profile_education;
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

    public function getUser_manager_profile_details_id() {
        return $this->user_manager_profile_details_id;
    }

    public function getLocale_id() {
        return $this->locale_id;
    }

    public function getUser_manager_profile_details_aboutme() {
        return $this->user_manager_profile_details_aboutme;
    }

    public function getUser_manager_profile_details_proud() {
        return $this->user_manager_profile_details_proud;
    }

    public function getUser_manager_profile_details_branch() {
        return $this->user_manager_profile_details_branch;
    }

    public function getUser_manager_profile_details_division() {
        return $this->user_manager_profile_details_division;
    }

    public function getUser_manager_profile_details_position() {
        return $this->user_manager_profile_details_position;
    }

    public function getUser_manager_profile_details_lead_style() {
        return $this->user_manager_profile_details_lead_style;
    }

    public function getUser_manager_profile_details_emp_learn() {
        return $this->user_manager_profile_details_emp_learn;
    }

    public function getUser_manager_profile_details_expectations() {
        return $this->user_manager_profile_details_expectations;
    }

    public function getUser_manager_profile_id() {
        return $this->user_manager_profile_id;
    }

    public function getUser_manager_profile_review_options() {
        return $this->user_manager_profile_review_options;
    }

    public function getUser_manager_profile_staylate() {
        return $this->user_manager_profile_staylate;
    }

    public function getUser_manager_profile_engage() {
        return $this->user_manager_profile_engage;
    }

    public function getUser_manager_profile_devops() {
        return $this->user_manager_profile_devops;
    }

    public function getUser_manager_profile_lvwRequests() {
        return $this->user_manager_profile_lvwRequests;
    }

    public function getUser_manager_profile_work_experience() {
        return $this->user_manager_profile_work_experience;
    }

    public function getUser_manager_profile_education() {
        return $this->user_manager_profile_education;
    }

    public function setUser_manager_profile_details_id($user_manager_profile_details_id) {
        $this->user_manager_profile_details_id = $user_manager_profile_details_id;
        return $this;
    }

    public function setLocale_id($locale_id) {
        $this->locale_id = $locale_id;
        return $this;
    }

    public function setUser_manager_profile_details_aboutme($user_manager_profile_details_aboutme) {
        $this->user_manager_profile_details_aboutme = $user_manager_profile_details_aboutme;
        return $this;
    }

    public function setUser_manager_profile_details_proud($user_manager_profile_details_proud) {
        $this->user_manager_profile_details_proud = $user_manager_profile_details_proud;
        return $this;
    }

    public function setUser_manager_profile_details_branch($user_manager_profile_details_branch) {
        $this->user_manager_profile_details_branch = $user_manager_profile_details_branch;
        return $this;
    }

    public function setUser_manager_profile_details_division($user_manager_profile_details_division) {
        $this->user_manager_profile_details_division = $user_manager_profile_details_division;
        return $this;
    }

    public function setUser_manager_profile_details_position($user_manager_profile_details_position) {
        $this->user_manager_profile_details_position = $user_manager_profile_details_position;
        return $this;
    }

    public function setUser_manager_profile_details_lead_style($user_manager_profile_details_lead_style) {
        $this->user_manager_profile_details_lead_style = $user_manager_profile_details_lead_style;
        return $this;
    }

    public function setUser_manager_profile_details_emp_learn($user_manager_profile_details_emp_learn) {
        $this->user_manager_profile_details_emp_learn = $user_manager_profile_details_emp_learn;
        return $this;
    }

    public function setUser_manager_profile_details_expectations($user_manager_profile_details_expectations) {
        $this->user_manager_profile_details_expectations = $user_manager_profile_details_expectations;
        return $this;
    }

    public function setUser_manager_profile_id($user_manager_profile_id) {
        $this->user_manager_profile_id = $user_manager_profile_id;
        return $this;
    }

    public function setUser_manager_profile_review_options($user_manager_profile_review_options) {
        $this->user_manager_profile_review_options = $user_manager_profile_review_options;
        return $this;
    }

    public function setUser_manager_profile_staylate($user_manager_profile_staylate) {
        $this->user_manager_profile_staylate = $user_manager_profile_staylate;
        return $this;
    }

    public function setUser_manager_profile_engage($user_manager_profile_engage) {
        $this->user_manager_profile_engage = $user_manager_profile_engage;
        return $this;
    }

    public function setUser_manager_profile_devops($user_manager_profile_devops) {
        $this->user_manager_profile_devops = $user_manager_profile_devops;
        return $this;
    }

    public function setUser_manager_profile_lvwRequests($user_manager_profile_lvwRequests) {
        $this->user_manager_profile_lvwRequests = $user_manager_profile_lvwRequests;
        return $this;
    }

    public function setUser_manager_profile_work_experience($user_manager_profile_work_experience) {
        $this->user_manager_profile_work_experience = $user_manager_profile_work_experience;
        return $this;
    }

    public function setUser_manager_profile_education($user_manager_profile_education) {
        $this->user_manager_profile_education = $user_manager_profile_education;
        return $this;
    }
}
?>
