<?php

require_once __DIR__ . '/../model/WorkSample.php';
require_once __DIR__ . '/../model/ApplicationWorkSample.php';
require_once __DIR__ . '/../dao/WorkSampleDAO.php';

class WorkSampleController {
    
    public static function getAllWorkSamplesForJobApplication($jobPosterApplicationId, $locale) {
        
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