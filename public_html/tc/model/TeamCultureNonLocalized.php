<?php

class TeamCultureNonLocalized implements JsonSerializable {

    private $team_size;
    private $gc_directory_url;
    private $narrative_text_en;
    private $narrative_text_fr;
    private $operating_context_en;
    private $operating_context_fr;
    private $what_we_value_en;
    private $what_we_value_fr;
    private $how_we_work_en;
    private $how_we_work_fr;

    /**
     *
     * @param int $team_size
     * @param string $gc_directory_url
     * @param string $narrative_text_en
     * @param string $narrative_text_fr
     * @param string $operating_context_en
     * @param string $operating_context_fr
     * @param string $what_we_value_en
     * @param string $what_we_value_fr
     * @param string $how_we_work_en
     * @param string $how_we_work_fr
     */
    public function __construct($team_size=null,$gc_directory_url=null,$narrative_text_en=null,$narrative_text_fr=null,$operating_context_en=null,$operating_context_fr=null,$what_we_value_en=null,$what_we_value_fr=null,$how_we_work_en=null,$how_we_work_fr=null) {
        $this->team_size = $team_size;
        $this->gc_directory_url = $gc_directory_url;
        $this->narrative_text_en = $narrative_text_en;
        $this->narrative_text_fr = $narrative_text_fr;
        $this->operating_context_en = $operating_context_en;
        $this->operating_context_fr = $operating_context_fr;
        $this->what_we_value_en = $what_we_value_en;
        $this->what_we_value_fr = $what_we_value_fr;
        $this->how_we_work_en = $how_we_work_en;
        $this->how_we_work_fr = $how_we_work_fr;
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

    public function getOperating_context_en() {
        return $this->operating_context_en;
    }

    public function getOperating_context_fr() {
        return $this->operating_context_fr;
    }

    public function getWhat_we_value_en() {
        return $this->what_we_value_en;
    }

    public function getWhat_we_value_fr() {
        return $this->what_we_value_fr;
    }

    public function getHow_we_work_en() {
        return $this->how_we_work_en;
    }

    public function getHow_we_work_fr() {
        return $this->how_we_work_fr;
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

    public function setOperating_context_en($operating_context_en) {
        $this->operating_context_en = $operating_context_en;
        return $this;
    }

    public function setOperating_context_fr($operating_context_fr) {
        $this->operating_context_fr = $operating_context_fr;
        return $this;
    }

    public function setWhat_we_value_en($what_we_value_en) {
        $this->what_we_value_en = $what_we_value_en;
        return $this;
    }

    public function setWhat_we_value_fr($what_we_value_fr) {
        $this->what_we_value_fr = $what_we_value_fr;
        return $this;
    }

    public function setHow_we_work_en($how_we_work_en) {
        $this->how_we_work_en = $how_we_work_en;
        return $this;
    }

    public function setHow_we_work_fr($how_we_work_fr) {
        $this->how_we_work_fr = $how_we_work_fr;
        return $this;
    }

}
