<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once '../model/Evidence.php';
require_once '../dao/EvidenceDAO.php';

class EvidenceController{
        
     public static function getEvidenceForJobApplication($jobPosterApplicationId){
        
        $evidenceList = EvidenceDAO::getEvidenceForJobApplication($jobPosterApplicationId);
        
        return $evidenceList;
        
    }
    
    public static function addEvidenceToJobApplication($jobPosterApplicationId, $evidence) {
        //TODO
    }
    
    public static function updateEvidenceForJobApplication($jobPosterApplicationId, $oldEvidenceId, $evidence) {
        //TODO
    }
    
    public static function removeEvidenceFromJobApplication($jobPosterApplicationId, $evidenceId) {
        //TODO
    }
    
}