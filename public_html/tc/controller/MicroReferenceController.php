<?php

require_once '../model/MicroReference.php';
require_once '../model/ApplicationMicroReference.php';
require_once '../dao/MicroReferenceDAO.php';

class MicroReferenceController{
    
    public static function getAllMicroReferencesForJobApplication($jobPosterApplicationId, $locale){
        
        $applicationMicroReference = MicroReferenceDAO::getApplicationMicroReferencesForJobApplication($jobPosterApplicationId, $locale);
                
        return $applicationMicroReference;
    }
    
    public static function putMicroReferenceForJobApplication($jobPosterApplicationId, $criteriaId, $microReference) {
        $applicationMicroReferenceId = MicroReferenceDAO::putMicroReferenceForJobApplication($jobPosterApplicationId, $criteriaId, $microReference);
        return array("application_micro_reference_id"=>$applicationMicroReferenceId);
    }
    
    public static function removeMicroReferenceFromJobApplication($jobPosterApplicationId, $criteriaId) {
        MicroReferenceDAO::removeMicroReferenceFromJobApplication($jobPosterApplicationId, $criteriaId);
        //TODO - what should this return?
    }    
}