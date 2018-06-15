<?php

class File {
    
    protected $file;
    protected $mime_type;
    protected $size;
    
    public function __construct($file = null, $mime_type = null, $size = null) {
        $this->file = $file;
        $this->mime_type = $mime_type;
        $this->size = $size;
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
    
    public function getFile() {
        return $this->file;
    }

    public function getMime_type() {
        return $this->mime_type;
    }

    public function getSize() {
        return $this->size;
    }

    public function setFile($file) {
        $this->file = $file;
        return $this;
    }

    public function setMime_type($mime_type) {
        $this->mime_type = $mime_type;
        return $this;
    }

    public function setSize($size) {
        $this->size = $size;
        return $this;
    }

}