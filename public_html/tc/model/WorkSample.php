<?php

class WorkSample implements JsonSerializable {

    protected $work_sample_id;
    protected $work_sample_name;
    protected $work_sample_date_created;
    protected $file_type;
    protected $work_sample_url;
    protected $work_sample_story;

    public function __construct($work_sample_id = null, $work_sample_name = null, $work_sample_date_created = null, $file_type = null, $work_sample_url = null, $work_sample_story = null) {
        $this->work_sample_id = $work_sample_id;
        $this->work_sample_name = $work_sample_name;
        $this->work_sample_date_created = $work_sample_date_created;
        $this->file_type = $file_type;
        $this->work_sample_url = $work_sample_url;
        $this->work_sample_story = $work_sample_story;
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

    public function getWork_sample_id() {
        return $this->work_sample_id;
    }

    public function getWork_sample_name() {
        return $this->work_sample_name;
    }

    public function getWork_sample_date_created() {
        return $this->work_sample_date_created;
    }

    public function getFile_type() {
        return $this->file_type;
    }

    public function getWork_sample_url() {
        return $this->work_sample_url;
    }

    public function getWork_sample_story() {
        return $this->work_sample_story;
    }

    public function setWork_sample_id($work_sample_id) {
        $this->work_sample_id = $work_sample_id;
        return $this;
    }

    public function setWork_sample_name($work_sample_name) {
        $this->work_sample_name = $work_sample_name;
        return $this;
    }

    public function setWork_sample_date_created($work_sample_date_created) {
        $this->work_sample_date_created = $work_sample_date_created;
        return $this;
    }

    public function setFile_type($file_type) {
        $this->file_type = $file_type;
        return $this;
    }

    public function setWork_sample_url($work_sample_url) {
        $this->work_sample_url = $work_sample_url;
        return $this;
    }

    public function setWork_sample_story($work_sample_story) {
        $this->work_sample_story = $work_sample_story;
        return $this;
    }

}
