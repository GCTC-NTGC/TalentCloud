<?php

class BasicWorkEnvironment implements JsonSerializable {
    
    private $id;
    private $remote_allowed;
    private $telework_allowed;
    private $flexible_allowed;

    public function __construct($id=null, $remote_allowed=null, $telework_allowed=null, $flexible_allowed=null) {
        $this->id = $id;
        $this->remote_allowed = $remote_allowed;
        $this->telework_allowed = $telework_allowed;
        $this->flexible_allowed = $flexible_allowed;
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
    
    public function getId() {
        return $this->id;
    }

    public function getRemote_allowed() {
        return $this->remote_allowed;
    }

    public function getTelework_allowed() {
        return $this->telework_allowed;
    }

    public function getFlexible_allowed() {
        return $this->flexible_allowed;
    }

    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    public function setRemote_allowed($remote_allowed) {
        $this->remote_allowed = $remote_allowed;
        return $this;
    }

    public function setTelework_allowed($telework_allowed) {
        $this->telework_allowed = $telework_allowed;
        return $this;
    }

    public function setFlexible_allowed($flexible_allowed) {
        $this->flexible_allowed = $flexible_allowed;
        return $this;
    }

}
   