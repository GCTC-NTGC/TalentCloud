<?php

class TeamCulture implements JsonSerializable {

    private $team_size;
    private $gc_directory_url;
    private $narrative_text;
    private $operating_context;
    private $what_we_value;
    private $how_we_work;

    /**
     *
     * @param int $team_size
     * @param string $gc_directory_url
     * @param string $narrative_text
     */
    public function __construct($team_size=null,$gc_directory_url=null,$narrative_text=null,$operating_context=null,$what_we_value=null,$how_we_work=null) {
        $this->team_size = $team_size;
        $this->gc_directory_url = $gc_directory_url;
        $this->narrative_text = $narrative_text;
        $this->operating_context = $operating_context;
        $this->what_we_value = $what_we_value;
        $this->how_we_work = $how_we_work;
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

    public function getNarrative_text() {
        return $this->narrative_text;
    }

    public function getOperating_context() {
        return $this->operating_context;
    }

    public function getWhat_we_value() {
        return $this->what_we_value;
    }

    public function getHow_we_work() {
        return $this->how_we_work;
    }

    public function setTeam_size($team_size) {
        $this->team_size = $team_size;
        return $this;
    }

    public function setGc_directory_url($gc_directory_url) {
        $this->gc_directory_url = $gc_directory_url;
        return $this;
    }

    public function setNarrative_text($narrative_text) {
        $this->narrative_text = $narrative_text;
        return $this;
    }

    public function setOperating_context() {
        $this->operating_context = $operating_context;
        return $this;
    }

    public function setWhat_we_value() {
        $this->what_we_value = $what_we_value;
        return $this;
    }

    public function setHow_we_work() {
        $this->how_we_work = $how_we_work;
        return $this;
    }


}
