<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Skill
 *
 * @author GBowden
 */
class Skill {
    //put your code here
    protected $skillId;
    protected $skillName;
    protected $skillDescription;

    function getSkillId() {
        return $this->skillId;
    }

    function getSkillName() {
        return $this->skillName;
    }

    function getSkillDescription() {
        return $this->skillDescription;
    }

    function setSkillId($skillId) {
        $this->skillId = $skillId;
    }

    function setSkillName($skillName) {
        $this->skillName = $skillName;
    }

    function setSkillDescription($skillDescription) {
        $this->skillDescription = $skillDescription;
    }

    
    
}
