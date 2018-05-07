<?php

class MicroReference implements JsonSerializable {

    protected $micro_reference_id;
    protected $micro_reference_name;
    protected $micro_reference_email;
    protected $relationship;
    protected $observed_from_date;
    protected $observed_until_date;
    protected $experience_level;
    protected $micro_reference_story;

    public function __construct($micro_reference_id=null, $micro_reference_name=null, $micro_reference_email=null, $relationship=null, $observed_from_date=null, $observed_until_date=null, $experience_level=null, $micro_reference_story=null) {
        $this->micro_reference_id = $micro_reference_id;
        $this->micro_reference_name = $micro_reference_name;
        $this->micro_reference_email = $micro_reference_email;
        $this->relationship = $relationship;
        $this->observed_from_date = $observed_from_date;
        $this->observed_until_date = $observed_until_date;
        $this->experience_level = $experience_level;
        $this->micro_reference_story = $micro_reference_story;
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
    public function getMicro_reference_id() {
        return $this->micro_reference_id;
    }

    public function getMicro_reference_name() {
        return $this->micro_reference_name;
    }

    public function getMicro_reference_email() {
        return $this->micro_reference_email;
    }

    public function getRelationship() {
        return $this->relationship;
    }

    public function getObserved_from_date() {
        return $this->observed_from_date;
    }

    public function getObserved_until_date() {
        return $this->observed_until_date;
    }

    public function getExperience_level() {
        return $this->experience_level;
    }

    public function getMicro_reference_story() {
        return $this->micro_reference_story;
    }

    public function setMicro_reference_id($micro_reference_id) {
        $this->micro_reference_id = $micro_reference_id;
        return $this;
    }

    public function setMicro_reference_name($micro_reference_name) {
        $this->micro_reference_name = $micro_reference_name;
        return $this;
    }

    public function setMicro_reference_email($micro_reference_email) {
        $this->micro_reference_email = $micro_reference_email;
        return $this;
    }

    public function setRelationship($relationship) {
        $this->relationship = $relationship;
        return $this;
    }

    public function setObserved_from_date($oberserved_from_date) {
        $this->observed_from_date = $oberserved_from_date;
        return $this;
    }

    public function setObserved_until_date($observed_until_date) {
        $this->observed_until_date = $observed_until_date;
        return $this;
    }

    public function setExperience_level($experience_level) {
        $this->experience_level = $experience_level;
        return $this;
    }

    public function setMicro_reference_story($micro_reference_story) {
        $this->micro_reference_story = $micro_reference_story;
        return $this;
    }
}
