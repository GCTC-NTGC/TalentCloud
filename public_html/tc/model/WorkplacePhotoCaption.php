<?php

class WorkplacePhotoCaption implements JsonSerializable {
    
    private $work_environment_id;
    private $photo_name;
    private $workplace_photo_id;
    private $description;

    public function __construct($work_environment_id=null, $photo_name=null, $workplace_photo_id=null, $description=null) {
        $this->work_environment_id = $work_environment_id;
        $this->photo_name = $photo_name;
        $this->workplace_photo_id = $workplace_photo_id;
        $this->description = $description;
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
    
    public function getWork_environment_id() {
        return $this->work_environment_id;
    }

    public function getPhoto_name() {
        return $this->photo_name;
    }

    public function getWorkplace_photo_id() {
        return $this->workplace_photo_id;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setWork_environment_id($work_environment_id) {
        $this->work_environment_id = $work_environment_id;
        return $this;
    }

    public function setPhoto_name($photo_name) {
        $this->photo_name = $photo_name;
        return $this;
    }

    public function setWorkplace_photo_id($workplace_photo_id) {
        $this->workplace_photo_id = $workplace_photo_id;
        return $this;
    }

    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }
}
   