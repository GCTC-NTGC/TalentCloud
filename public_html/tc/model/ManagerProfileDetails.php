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
    private $user_manager_profile_details_lead_style;
    private $user_manager_profile_details_emp_learn;
    private $user_manager_profile_details_expectations;
    private $user_manager_profile_id;
    
    public function __construct($user_manager_profile_details_id = null,$locale_id = null, $user_manager_profile_details_aboutme = null, $user_manager_profile_details_proud = null, $user_manager_profile_details_lead_style = null, $user_manager_profile_details_emp_learn = null, $user_manager_profile_details_expectations = null,$user_manager_profile_id = null) {
        $this->user_manager_profile_details_id = $user_manager_profile_details_id;
        $this->locale_id = $locale_id;
        $this->user_manager_profile_details_aboutme = $user_manager_profile_details_aboutme;
        $this->user_manager_profile_details_proud = $user_manager_profile_details_proud;
        $this->user_manager_profile_details_lead_style = $user_manager_profile_details_lead_style;
        $this->user_manager_profile_details_emp_learn = $user_manager_profile_details_emp_learn;
        $this->user_manager_profile_details_expectations = $user_manager_profile_details_expectations;
        $this->user_manager_profile_id = $user_manager_profile_id;
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

    public function getUser_manager_profile_details_lead_style() {
        return $this->user_manager_profile_details_lead_style;
    }

    public function getUser_manager_profile_details_emp_learn() {
        return $this->user_manager_profile_details_emp_learn;
    }

    public function getUser_manager_profile_details_expectations() {
        return $this->user_manager_profile_details_expectations;
    }

    public function setUser_manager_profile_details_id($user_manager_profile_details_id) {
        $this->user_manager_profile_details_id = $user_manager_profile_details_id;
    }

    public function setLocale_id($locale_id) {
        $this->locale_id = $locale_id;
    }

    public function setUser_manager_profile_details_aboutme($user_manager_profile_details_aboutme) {
        $this->user_manager_profile_details_aboutme = $user_manager_profile_details_aboutme;
    }

    public function setUser_manager_profile_details_proud($user_manager_profile_details_proud) {
        $this->user_manager_profile_details_proud = $user_manager_profile_details_proud;
    }

    public function setUser_manager_profile_details_lead_style($user_manager_profile_details_lead_style) {
        $this->user_manager_profile_details_lead_style = $user_manager_profile_details_lead_style;
    }

    public function setUser_manager_profile_details_emp_learn($user_manager_profile_details_emp_learn) {
        $this->user_manager_profile_details_emp_learn = $user_manager_profile_details_emp_learn;
    }

    public function setUser_manager_profile_details_expectations($user_manager_profile_details_expectations) {
        $this->user_manager_profile_details_expectations = $user_manager_profile_details_expectations;
    }


}
?>