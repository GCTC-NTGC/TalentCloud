<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class ManagerProfileWithDetails implements JsonSerializable {
    
    private $manager_profile;
    private $manager_profile_details;
    private $user;
    
    public function __construct($manager_profile = null, $manager_profile_details = null, $user = null) {
        $this->manager_profile = $manager_profile;
        $this->manager_profile_details = $manager_profile_details;
        $this->user = $user;
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
    
    public function getManager_profile() {
        return $this->manager_profile;
    }

    public function getManager_profile_details() {
        return $this->manager_profile_details;
    }

    public function setManager_profile($manager_profile) {
        $this->manager_profile = $manager_profile;
    }

    public function setManager_profile_details($manager_profile_details) {
        $this->manager_profile_details = $manager_profile_details;
    }

    public function getUser() {
        return $this->user;
    }

    public function setUser($user) {
        $this->user = $user;
    }



}
?>