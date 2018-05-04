<?php

require_once '../model/WorkSample.php';
require_once '../model/ApplicationWorkSample.php';
require_once '../dao/WorkSampleDAO.php';

class WorkSampleController{
    
    public static function getAllWorkSamplesForJobApplication($jobPosterApplicationId, $locale){
        
        $applicationWorkSamples = WorkSampleDAO::getWorkSamplesForJobApplication($jobPosterApplicationId, $locale);
                
        return $applicationWorkSamples;
    }
    
    public static function putWorkSampleForJobApplication($jobPosterApplicationId, $criteriaId, $workSample) {
        $applicationWorkSampleId = WorkSampleDAO::putWorkSampleForJobApplication($jobPosterApplicationId, $criteriaId, $workSample);
        return array("application_work_sample_id"=>$applicationWorkSampleId);
    }
    
    public static function removeWorkSampleFromJobApplication($jobPosterApplicationId, $criteriaId) {
        WorkSampleDAO::removeWorkSampleFromJobApplication($jobPosterApplicationId, $criteriaId);
        //TODO - what should this return?
    }    
}