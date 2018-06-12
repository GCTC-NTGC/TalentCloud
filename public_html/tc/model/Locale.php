<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Locale {
    
    private $locale_id;
    private $locale_iso;
    
    public function __construct($locale_id, $locale_iso) {
        $this->locale_id = $locale_id;
        $this->locale_iso = $locale_iso;
    }

    public function getLocale_id() {
        return $this->locale_id;
    }

    public function getLocale_iso() {
        return $this->locale_iso;
    }

    public function setLocale_id($locale_id) {
        $this->locale_id = $locale_id;
        return $this;
    }

    public function setLocale_iso($locale_iso) {
        $this->locale_iso = $locale_iso;
        return $this;
    }

}

?>