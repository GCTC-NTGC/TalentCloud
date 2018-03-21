<?php

class TeamCultureNonLocalized implements JsonSerializable {
    
    private $team_size;
    private $gc_directory_url;
    private $narrative_text_en;
    private $narrative_text_fr;

    /**
     * 
     * @param int $team_size
     * @param string $gc_directory_url
     * @param string $narrative_text_en
     */
    public function __construct($team_size=null,$gc_directory_url=null,$narrative_text_en=null,$narrative_text_fr=null) {
        $this->team_size = $team_size;
        $this->gc_directory_url = $gc_directory_url;
        $this->narrative_text_en = $narrative_text_en;
        $this->narrative_text_fr = $narrative_text_fr;
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
    
    public function getTeam_size() {
        return $this->team_size;
    }

    public function getGc_directory_url() {
        return $this->gc_directory_url;
    }

    public function getNarrative_text_en() {
        return $this->narrative_text_en;
    }

    public function getNarrative_text_fr() {
        return $this->narrative_text_fr;
    }

    public function setTeam_size($team_size) {
        $this->team_size = $team_size;
        return $this;
    }

    public function setGc_directory_url($gc_directory_url) {
        $this->gc_directory_url = $gc_directory_url;
        return $this;
    }

    public function setNarrative_text_en($narrative_text_en) {
        $this->narrative_text_en = $narrative_text_en;
        return $this;
    }

    public function setNarrative_text_fr($narrative_text_fr) {
        $this->narrative_text_fr = $narrative_text_fr;
        return $this;
    }

   
}
   