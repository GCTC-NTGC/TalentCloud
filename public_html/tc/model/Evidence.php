<?php

class Evidence implements JsonSerializable{
    
    protected $evidence_id;
    protected $skill_ids;
    protected $experience_level_id;
    protected $skill_level_id;
    protected $evidence_description;
    protected $last_updated;
    
    public function __construct($evidence_id=null, $skill_ids=[], $experience_level_id=null, $skill_level_id=null, $evidence_description=null, $last_updated=null) {
        $this->evidence_id = $evidence_id;
        $this->skill_ids = $skill_ids;
        $this->experience_level_id = $experience_level_id;
        $this->skill_level_id = $skill_level_id;
        $this->evidence_description = $evidence_description;
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
    
    public function getEvidence_id() {
        return $this->evidence_id;
    }

    public function getSkill_ids() {
        return $this->skill_ids;
    }

    public function getExperience_level_id() {
        return $this->experience_level_id;
    }

    public function getSkill_level_id() {
        return $this->skill_level_id;
    }

    public function getEvidence_description() {
        return $this->evidence_description;
    }

    public function getLast_updated() {
        return $this->last_updated;
    }

    public function setEvidence_id($evidence_id) {
        $this->evidence_id = $evidence_id;
        return $this;
    }

    public function setSkill_ids($skill_id) {
        $this->skill_ids = $skill_id;
        return $this;
    }

    public function setExperience_level_id($experience_level_id) {
        $this->experience_level_id = $experience_level_id;
        return $this;
    }

    public function setSkill_level_id($skill_level_id) {
        $this->skill_level_id = $skill_level_id;
        return $this;
    }

    public function setEvidence_description($evidence_description) {
        $this->evidence_description = $evidence_description;
        return $this;
    }

    public function setLast_updated($last_updated) {
        $this->last_updated = $last_updated;
        return $this;
    }

}

