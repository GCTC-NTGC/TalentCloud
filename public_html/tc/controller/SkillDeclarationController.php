<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once '../model/SkillDeclaration.php';
require_once '../dao/SkillDeclarationDAO.php';

class SkillDeclarationController{
        
     public static function getEvidenceForJobApplication($jobPosterApplicationId){
        
        $evidenceList = SkillDeclarationDAO::getSkillDeclarationsForJobApplication($jobPosterApplicationId);
        
        return $evidenceList;
        
    }
    
    public static function addSkillDeclarationToJobApplication($jobPosterApplicationId, $evidence) {
        //TODO
    }
    
    public static function updateSkillDeclarationForJobApplication($jobPosterApplicationId, $oldEvidenceId, $evidence) {
        //TODO
    }
    
    public static function removeSkillDeclarationFromJobApplication($jobPosterApplicationId, $evidenceId) {
        //TODO
    }
    
}