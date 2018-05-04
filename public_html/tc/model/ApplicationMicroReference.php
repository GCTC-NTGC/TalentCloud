<?php

require_once '../model/MicroReference.php';

class ApplicationMicroReference implements JsonSerializable{
    
    protected $criteria_id;
    protected $job_poster_appliction_id;
    protected $micro_reference;
    
    public function __construct($criteria_id=null, $job_poster_appliction_id=null, MicroReference $micro_reference=null) {
        $this->criteria_id = $criteria_id;
        $this->job_poster_appliction_id = $job_poster_appliction_id;
        $this->micro_reference = $micro_reference;
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
    
    public function getCriteria_id() {
        return $this->criteria_id;
    }

    public function getJob_poster_appliction_id() {
        return $this->job_poster_appliction_id;
    }

    public function getMicro_reference() {
        return $this->micro_reference;
    }

    public function setCriteria_id($criteria_id) {
        $this->criteria_id = $criteria_id;
        return $this;
    }

    public function setJob_poster_appliction_id($job_poster_appliction_id) {
        $this->job_poster_appliction_id = $job_poster_appliction_id;
        return $this;
    }

    public function setMicro_reference($micro_reference) {
        $this->micro_reference = $micro_reference;
        return $this;
    }

}

