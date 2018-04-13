<?php

class SkillDeclaration implements JsonSerializable{
    
    protected $skill_declaration_id;
    protected $skills;
    protected $experience_level_id;
    protected $skill_level_id;
    protected $description;
    protected $last_updated;
    
    public function __construct($skill_declaration_id=null, $skills=[], $experience_level_id=null, $skill_level_id=null, $description=null, $last_updated=null) {
        $this->skill_declaration_id = $$skill_declaration_id;
        $this->skills = $skills;
        $this->experience_level_id = $experience_level_id;
        $this->skill_level_id = $skill_level_id;
        $this->description = $description;
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
    
    public function getSkill_declaration_id() {
        return $this->skill_declaration_id;
    }

    public function getSkills() {
        return $this->skills;
    }

    public function getExperience_level_id() {
        return $this->experience_level_id;
    }

    public function getSkill_level_id() {
        return $this->skill_level_id;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getLast_updated() {
        return $this->last_updated;
    }

    public function setSkill_declaration_id($skill_declaration_id) {
        $this->skill_declaration_id = $skill_declaration_id;
        return $this;
    }

    public function setSkills($skills) {
        $this->skills = $skills;
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

    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }

    public function setLast_updated($last_updated) {
        $this->last_updated = $last_updated;
        return $this;
    }
}

