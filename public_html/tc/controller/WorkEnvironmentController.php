<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once '../model/WorkEnvironment.php';
require_once '../model/BasicWorkEnvironment.php';
require_once '../model/WorkplacePhotoCaption.php';
require_once '../dao/WorkEnvironmentDAO.php';

class WorkEnvironmentController{
    
    public static function setWorkEnvironmentByManagerProfile($workEnvironment, $managerProfileId) {
        $workEnvId = WorkEnvironmentDAO::getWorkEnvironmentIdByManagerProfile($managerProfileId);
        if ($workEnvId === 0) {
            $workEnvironment = self::createWorkEnvironment($workEnvironment);
            WorkEnvironmentDAO::setManagerProfileWorkEnvironment($managerProfileId, $workEnvironment->getBasic_work_environment()->getId());
        } else {
            //update work environment
            echo('work env already exists for manager profile');
        }
        return $workEnvironment;
    }
    
    /**
     * Adds $workEnvironment to database, and returns it with all id's included
     * 
     * @param WorkEnvironment $workEnvironment
     * @return WorkEnvironment $workEnvironment
     */
    public static function createWorkEnvironment($workEnvironment) {
        $workEnvironmentId = WorkEnvironmentDAO::createBasicWorkEnvironment($workEnvironment->getBasic_work_environment());
        
        $workEnvironment->getBasic_work_environment()->setId($workEnvironmentId);
        
        foreach($workEnvironment->getWorkplace_photo_captions() as $photoCaption) {
            $photoCaption->setWork_environment_id($workEnvironmentId);
            WorkEnvironmentDAO::createWorkplacePhotoCaption($photoCaption);
        }
                
        return $workEnvironment;
    }
}