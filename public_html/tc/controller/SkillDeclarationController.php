<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once '../model/SkillDeclaration.php';
require_once '../dao/SkillDeclarationDAO.php';

class SkillDeclarationController{
    
    public static function getAllSkillDeclarationsForJobApplication($jobPosterApplicationId){
        
        $skillDeclarations = SkillDeclarationDAO::getSkillDeclarationsForJobApplication($jobPosterApplicationId);
                
        return $skillDeclarations;
    }
    
    public static function putSkillDeclarationForJobApplication($jobPosterApplicationId, $criteriaId, $skillDeclaration) {
        $declarationId = SkillDeclarationDAO::putSkillDeclarationForJobApplication($jobPosterApplicationId, $criteriaId, $skillDeclaration);
        return array("skill_declaration_id"=>$declarationId);
    }
    
    public static function removeSkillDeclarationFromJobApplication($jobPosterApplicationId, $criteriaId) {
        SkillDeclarationDAO::removeSkillDeclarationFromJobApplication($jobPosterApplicationId, $criteriaId);
        //TODO - what should this return?
    }
    
    public static function getMostRecentDeclarationForUserAndSkill($userId, $skillName) {
        return SkillDeclarationDAO::getMostRecentDeclarationForUserAndSkill($userId, $skillName);
    }
    
}