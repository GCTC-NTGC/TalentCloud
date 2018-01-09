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
class Content implements JsonSerializable {

    protected $content;

    function __construct(){
        return array();
    }
    
    public function jsonSerialize() {
        return [ 'content' => $this->content ];
    }
    
    function getContent() {
        return $this->content;
    }

    function setContent($content) {
        $this->content = $content;
    }
    
}

?>
