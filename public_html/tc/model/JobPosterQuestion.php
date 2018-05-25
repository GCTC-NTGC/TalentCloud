<?php

class JobPosterQuestion implements JsonSerializable{
    
    private $id;
    private $locale;
    private $question;
    private $description;
    
    
    public function __construct($id = null, $locale=null,$question = null, $description=null) {
        $this->id = $id;
        $this->locale = $locale;
        $this->question = $question;
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
    
    public function getId() {
        return $this->id;
    }

    public function getLocale() {
        return $this->locale;
    }

    public function getQuestion() {
        return $this->question;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    public function setLocale($locale) {
        $this->locale = $locale;
        return $this;
    }

    public function setQuestion($question) {
        $this->question = $question;
        return $this;
    }

    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }

}
