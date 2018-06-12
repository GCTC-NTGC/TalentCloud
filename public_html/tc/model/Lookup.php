<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Lookup implements JsonSerializable {
    
    protected $id;
    protected $value;
    
    public function __construct($id = null, $value = null) {
        $this->id = $id;
        $this->value = $value;
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

    public function getId() {
        return $this->id;
    }

    public function getValue() {
        return $this->value;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setValue($value) {
        $this->value = $value;
    }


    
}

?>