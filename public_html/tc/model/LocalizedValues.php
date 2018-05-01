<?php

class LocalizedValues implements JsonSerializable{
    
    private $en_value;
    private $fr_value;
    
    public function __construct($en_value = null, $fr_value = null) {
        $this->en_value = $en_value;
        $this->fr_value = $fr_value;
    }

    public function jsonSerialize() {
        return ["en_CA" => $this->en_value, "fr_CA" => $this->fr_value];
    }
    
    public function getEn_value() {
        return $this->en_value;
    }

    public function getFr_value() {
        return $this->fr_value;
    }

    public function setEn_value($en_value) {
        $this->en_value = $en_value;
        return $this;
    }

    public function setFr_value($fr_value) {
        $this->fr_value = $fr_value;
        return $this;
    }

}