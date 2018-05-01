<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class ManagerProfile implements JsonSerializable{

    private $user_manager_profile_id;
    private $user_manager_profile_department_id;
    private $user_manager_profile_twitter;
    private $user_manager_profile_linkedin;
    private $user_id;
    private $profile_pic;

    public function __construct($user_manager_profile_id = null, $user_manager_profile_department_id = null, $user_manager_profile_twitter = null, $user_manager_profile_linkedin = null, $user_id = null, $profile_pic = null) {
        $this->user_manager_profile_id = $user_manager_profile_id;
        $this->user_manager_profile_department_id = $user_manager_profile_department_id;
        $this->user_manager_profile_twitter = $user_manager_profile_twitter;
        $this->user_manager_profile_linkedin = $user_manager_profile_linkedin;
        $this->user_id = $user_id;
        $this->profile_pic = $profile_pic;

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

    public function getUser_manager_profile_id() {
        return $this->user_manager_profile_id;
    }

    public function getUser_manager_profile_department_id() {
        return $this->user_manager_profile_department_id;
    }

    public function getUser_manager_profile_twitter() {
        return $this->user_manager_profile_twitter;
    }

    public function getUser_manager_profile_linkedin() {
        return $this->user_manager_profile_linkedin;
    }

    public function getUser_id() {
        return $this->user_id;
    }

    public function getProfile_pic() {
        return $this->profile_pic;
    }

    public function setUser_manager_profile_id($user_manager_profile_id) {
        $this->user_manager_profile_id = $user_manager_profile_id;
    }

    public function setUser_manager_profile_department_id($user_manager_profile_department_id) {
        $this->user_manager_profile_department_id = $user_manager_profile_department_id;
    }

    public function setUser_manager_profile_twitter($user_manager_profile_twitter) {
        $this->user_manager_profile_twitter = $user_manager_profile_twitter;
    }

    public function setUser_manager_profile_linkedin($user_manager_profile_linkedin) {
        $this->user_manager_profile_linkedin = $user_manager_profile_linkedin;
    }

    public function setUser_id($user_id) {
        $this->user_id = $user_id;
    }

    public function setProfile_pic($profile_pic) {
        $this->profile_pic = $profile_pic;
    }



}
?>
