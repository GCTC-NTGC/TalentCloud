<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class ProfilePic {
    protected $user_id;
    protected $image;
    protected $last_updated;
    
    public function __construct($user_id, $image, $last_updated) {
        $this->user_id = $user_id;
        $this->image = $image;
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
    
    public function getUser_id() {
        return $this->user_id;
    }

    public function getImage() {
        return $this->image;
    }

    public function getLast_updated() {
        return $this->last_updated;
    }

    public function setUser_id($user_id) {
        $this->user_id = $user_id;
    }

    public function setImage($image) {
        $this->image = $image;
    }

    public function setLast_updated($last_updated) {
        $this->last_updated = $last_updated;
    }



}