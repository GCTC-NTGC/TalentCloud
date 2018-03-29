<?php

class JobPosterQuestion implements JsonSerializable{
    
    private $id;
    private $question;
    
    public function __construct($id = null,$question = null) {
        $this->id = $id;
        $this->question = $question;
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
    
    public function getId() {
        return $this->id;
    }

    public function getQuestion() {
        return $this->question;
    }

    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    public function setQuestion($question) {
        $this->question = $question;
        return $this;
    }

}
