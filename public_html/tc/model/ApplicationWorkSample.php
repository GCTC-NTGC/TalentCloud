<?php

require_once '../model/WorkSample.php';

class ApplicationWorkSample implements JsonSerializable{
    
    protected $criteria_id;
    protected $work_sample;
    
    public function __construct($criteria_id=null,WorkSample $work_sample=null) {
        $this->criteria_id = $criteria_id;
        $this->work_sample = $work_sample;
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

    public function getWork_sample() {
        return $this->work_sample;
    }

    public function setCriteria_id($criteria_id) {
        $this->criteria_id = $criteria_id;
        return $this;
    }

    public function setWork_sample(WorkSample $work_sample) {
        $this->work_sample = $work_sample;
        return $this;
    }


}

