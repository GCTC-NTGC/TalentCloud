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
            $workEnvironment->getBasic_work_environment()->setId($workEnvId);
            self::updateWorkEnvironment($workEnvironment);
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
            //TODO: don't want to overwrite workplace_photo_id!!!
            WorkEnvironmentDAO::insertUpdateWorkplacePhotoCaption($photoCaption);
        }
                
        return $workEnvironment;
    }
    
    /**
     * 
     * @param WorkEnvironment $workEnvironment
     * @return WorkEnvironment $workEnvironment
     */
    public static function updateWorkEnvironment($workEnvironment) {
        WorkEnvironmentDAO::updateBasicWorkEnvironment($workEnvironment->getBasic_work_environment());
        
        foreach($workEnvironment->getWorkplace_photo_captions() as $caption) {
            $caption->setWork_environment_id($workEnvironment->getBasic_work_environment()->getId());
            //TODO: don't want to overwrite workplace_photo_id!!!
            WorkEnvironmentDAO::insertUpdateWorkplacePhotoCaption($caption);
        }
        
        return $workEnvironment;
    }
    
    public static function getWorkEnivronmentByManagerProfile($managerProfileId) {
        $workEnvId = WorkEnvironmentDAO::getWorkEnvironmentIdByManagerProfile($managerProfileId);
        $basicWorkEnvironment = WorkEnvironmentDAO::getBasicWorkEnvironment($workEnvId);
        $photoCaptions = WorkEnvironmentDAO::getWorkplacePhotoCaptions($workEnvId);
        $workEnvironment = new WorkEnvironment();
        $workEnvironment->setBasic_work_environment($basicWorkEnvironment);
        $workEnvironment->setWorkplace_photo_captions($photoCaptions);
        
        return $workEnvironment;
    }
    
    public static function putWorkplacePhotoByManagerProfileAndName($workplacePhoto, $photoName, $managerProfileId) {
        $exists = WorkEnvironmentDAO::workplacePhotoExistsForManagerAndName($managerProfileId, $photoName);
        if ($exists) {
            WorkEnvironmentDAO::updateWorkplacePhoto($workplacePhoto, $managerProfileId, $photoName);      
        } else {
            
            $result = WorkEnvironmentDAO::insertWorkplacePhoto($workplacePhoto);

            $workEnvironmentId = WorkEnvironmentDAO::getWorkEnvironmentIdByManagerProfile($managerProfileId);
            
            if ($workEnvironmentId === 0) {
                $basicWorkEnvironment = new BasicWorkEnvironment();
                $env = WorkEnvironmentDAO::createBasicWorkEnvironment($basicWorkEnvironment);
                $workEnvironmentId = $env->getId();
            }
            
            $caption = WorkEnvironmentDAO::getWorkplacePhotoCaptionByName($workEnvironmentId, $photoName);
            if ($caption) {

                $caption->setWorkplace_photo_id($result);
            } else {
                
                $caption = new WorkplacePhotoCaption($workEnvironmentId, $photoName, $result, '');                
            }
            WorkEnvironmentDAO::insertUpdateWorkplacePhotoCaption($caption);
        }
        return "";
    }
    
    
    
}