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
        
        $workEnvId = $workEnvironment->getBasic_work_environment()->getId();
        foreach($workEnvironment->getWorkplace_photo_captions() as $newCaption) {
            //See if caption for this workplace + photoName already exists            
            $oldCaption = WorkEnvironmentDAO::getWorkplacePhotoCaptionByName($workEnvId, $newCaption->getPhoto_name());
            if ($oldCaption) {
                //already exists, so just update description
                $oldCaption->setDescription($newCaption->getDescription());
                WorkEnvironmentDAO::updateWorkplacePhotoCaption($oldCaption);
            } else { 
                //doesn't exist, so make sure it has correct work env id and blank photo id, and insert it
                $newCaption->setWork_environment_id($workEnvId);
                $newCaption->setWorkplace_photo_id(null);
                WorkEnvironmentDAO::insertWorkplacePhotoCaption($newCaption);
            }
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
        
        $workEnvId = $workEnvironment->getBasic_work_environment()->getId();
        foreach($workEnvironment->getWorkplace_photo_captions() as $newCaption) {
            //See if caption for this workplace + photoName already exists            
            $oldCaption = WorkEnvironmentDAO::getWorkplacePhotoCaptionByName($workEnvId, $newCaption->getPhoto_name());
            if ($oldCaption) {
                //already exists, so just update description
                $oldCaption->setDescription($newCaption->getDescription());
                WorkEnvironmentDAO::updateWorkplacePhotoCaption($oldCaption);
            } else { 
                //doesn't exist, so make sure it has correct work env id and blank photo id, and insert it
                $newCaption->setWork_environment_id($workEnvId);
                $newCaption->setWorkplace_photo_id(null);
                WorkEnvironmentDAO::insertWorkplacePhotoCaption($newCaption);
            }
        }
        
        return $workEnvironment;
    }
    
    public static function getWorkEnivronmentByManagerProfile($managerProfileId) {
        $workEnvironment = new WorkEnvironment();
        $workEnvId = WorkEnvironmentDAO::getWorkEnvironmentIdByManagerProfile($managerProfileId);
        $basicWorkEnvironment = WorkEnvironmentDAO::getBasicWorkEnvironment($workEnvId);
        $photoCaptions = WorkEnvironmentDAO::getWorkplacePhotoCaptions($workEnvId);
        $workEnvironment->setBasic_work_environment($basicWorkEnvironment);
        $workEnvironment->setWorkplace_photo_captions($photoCaptions);
        
        return $workEnvironment;
    }
    
    public static function putWorkplacePhotoByManagerProfileAndName($workplacePhoto, $photoName, $managerProfileId) {
        $exists = WorkEnvironmentDAO::workplacePhotoExistsForManagerAndName($managerProfileId, $photoName);
        if ($exists) {
            WorkEnvironmentDAO::updateWorkplacePhoto($workplacePhoto, $managerProfileId, $photoName);      
        } else {
            
            $photoId = WorkEnvironmentDAO::insertWorkplacePhoto($workplacePhoto);

            $workEnvironmentId = WorkEnvironmentDAO::getWorkEnvironmentIdByManagerProfile($managerProfileId);
            
            if ($workEnvironmentId === 0) {
                $basicWorkEnvironment = new BasicWorkEnvironment();
                $env = WorkEnvironmentDAO::createBasicWorkEnvironment($basicWorkEnvironment);
                $workEnvironmentId = $env->getId();
            }
            
            $caption = WorkEnvironmentDAO::getWorkplacePhotoCaptionByName($workEnvironmentId, $photoName);
            if ($caption) {
                $caption->setWorkplace_photo_id($photoId);
                WorkEnvironmentDAO::updateWorkplacePhotoCaption($caption);
            } else {                
                $caption = new WorkplacePhotoCaption($workEnvironmentId, $photoName, $photoId, '');      
                WorkEnvironmentDAO::insertWorkplacePhotoCaption($caption);
            }
            
        }
        return "";
    }
    
    public static function getWorkplacePhotoByManagerProfileAndName($photoName, $managerProfileId) {
        if (WorkEnvironmentDAO::workplacePhotoExistsForManagerAndName($managerProfileId, $photoName))
            return WorkEnvironmentDAO::getWorkplacePhoto($managerProfileId, $photoName);
        else 
            return NULL;            
    }
    
    
    
}