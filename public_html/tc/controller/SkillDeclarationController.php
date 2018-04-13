<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once '../model/SkillDeclaration.php';
require_once '../dao/SkillDeclarationDAO.php';

class SkillDeclarationController{
    
    public static function getEssentialSkillDeclarationsForJobApplication($jobPosterApplicationId){
        $declarations = SkillDeclarationDAO::getEssentialSkillDeclarationsForJobApplication($jobPosterApplicationId);
        return $declarations;
    }
    
    public static function getAssetSkillDeclarationsForJobApplication($jobPosterApplicationId){
        $declarations = SkillDeclarationDAO::getAssetSkillDeclarationsForJobApplication($jobPosterApplicationId);
        return $declarations;
    }
    
    public static function getAllSkillDeclarationsForJobApplication($jobPosterApplicationId){
        
        $essentialDeclarations = self::getEssentialSkillDeclarationsForJobApplication($jobPosterApplicationId);
        $assetDeclarations = self::getAssetSkillDeclarationsForJobApplication($jobPosterApplicationId);
        
        return array_merge($essentialDeclarations, $assetDeclarations);        
    }
    
    public static function putEssentialSkillDeclarationForJobApplication($jobPosterApplicationId, $essentialCriteriaId, $skillDeclaration) {
        //TODO
    }
    
    public static function putAssetSkillDeclarationForJobApplication($jobPosterApplicationId, $assetCriteriaId, $skillDeclaration) {
        //TODO
    }
    
    public static function removeEssentialSkillDeclarationFromJobApplication($jobPosterApplicationId, $essentialCriteriaId) {
        //TODO
    }
    
    public static function removeAssetSkillDeclarationFromJobApplication($jobPosterApplicationId, $assetCriteriaId) {
        //TODO
    }
    
}