<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Content
 *
 * @author gregg
 */
class Label implements JsonSerializable {

    protected $labelKey;
    protected $labelValue;

    function __construct() {
        
    }
    
    public function jsonSerialize() {
        return array($this->labelKey=>$this->labelValue);
    }

    function getLabelKey() {
        return $this->labelKey;
    }

    function setLabelKey($labelKey) {
        $this->labelKey = $labelKey;
    }

    function getLabelValue() {
        return $this->labelValue;
    }

    function setLabelValue($labelValue) {
        $this->labelValue = $labelValue;
    }


}

?>
