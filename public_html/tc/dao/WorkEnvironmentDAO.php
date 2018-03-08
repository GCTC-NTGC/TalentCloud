<?php
	
    date_default_timezone_set('America/Toronto');
    error_reporting(E_ALL);
    ini_set("display_errors", 1);
    set_time_limit(0);

    if(!isset($_SESSION)){
        session_start();
    }

    /*set api path*/
    set_include_path(get_include_path() . PATH_SEPARATOR);


/** Model Classes */
require_once '../dao/BaseDAO.php';
require_once '../model/WorkEnvironment.php';
require_once '../model/BasicWorkEnvironment.php';
require_once '../model/WorkplacePhotoCaption.php';

/**
 * Summary: Data Access Object for Resources
 * 
 * @extends BaseDAO
 */
class WorkEnvironmentDAO extends BaseDAO {

    /**
     * 
     * @param int $managerProfileId
     * @param int $workEnvironmentId
     * 
     * @return int $rowsModified
     */
    public static function setManagerProfileWorkEnvironment($managerProfileId, $workEnvironmentId) {
        $link = BaseDAO::getConnection();
        $sqlStr = 'INSERT INTO manager_profile_to_work_environment
            (user_manager_profile_id, work_environment_id)
            VALUES (:manager_profile_id, :work_environment_id)
            ON DUPLICATE KEY UPDATE
            work_environment_id=:work_env_id_update
            ;';
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':manager_profile_id', $managerProfileId, PDO::PARAM_INT);
        $sql->bindValue(':work_environment_id', $workEnvironmentId, PDO::PARAM_INT);
        $sql->bindValue(':work_env_id_update', $workEnvironmentId, PDO::PARAM_INT);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));           
            $rowsModified = $sql->rowCount();
        } catch (PDOException $e) {
            return 'setManagerProfileWorkEnvironment failed: ' . $e->getMessage();
        }
        return $rowsModified;
    }
    
    /**
     * 
     * @param int $managerProfileId
     * @return int $workEnvironmentId - 0 if does not exist
     */
    public static function getWorkEnvironmentIdByManagerProfile($managerProfileId) {
        $link = BaseDAO::getConnection();
        $sqlStr = 'SELECT 
            mp2we.work_environment_id
            FROM
            manager_profile_to_work_environment mp2we
            WHERE
            user_manager_profile_id = :manager_profile_id
            ;';
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':manager_profile_id', $managerProfileId, PDO::PARAM_INT);
        
        $workEnvironmentId = 0;
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));     
            $sql->setFetchMode(PDO::FETCH_ASSOC);
            $rows = $sql->fetch();
            if ($rows && sizeof($rows) > 0) {
                $workEnvironmentId = $rows['work_environment_id'];
            }
        } catch (PDOException $e) {
            return 'getWorkEnvironmentIdByManagerProfile failed: ' . $e->getMessage();
        }
        return $workEnvironmentId;
    }
    
    /**
     * 
     * @param BasicWorkEnvironment $basicWorkEnvironment
     * @return int $insert_id - id of the newly created row
     */
    public static function createBasicWorkEnvironment($basicWorkEnvironment) {
        $link = BaseDAO::getConnection();
        $sqlStr = "INSERT INTO work_environment
            (remote_allowed, telework_allowed, flexible_allowed)
            VALUES
            (:remote_allowed, :telework_allowed, :flexible_allowed)            
            ;";
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':remote_allowed', $basicWorkEnvironment->getRemote_allowed(), PDO::PARAM_STR);
        $sql->bindValue(':telework_allowed', $basicWorkEnvironment->getTelework_allowed(), PDO::PARAM_STR);
        $sql->bindValue(':flexible_allowed', $basicWorkEnvironment->getFlexible_allowed(), PDO::PARAM_STR);
        
        $insert_id = 0;
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));           
            $rowsmodified = $sql->rowCount();
            if($rowsmodified > 0){
                $insert_id = $link->lastInsertId();
            }
        } catch (PDOException $e) {
            return 'createBasicWorkEnvironment failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $insert_id;
    }
    
    /**
     * 
     * @param BasicWorkEnvironment $basicWorkEnvironment
     * @return int $rowsmodified
     */
    public static function updateBasicWorkEnvironment($basicWorkEnvironment) {
        $link = BaseDAO::getConnection();
        $sqlStr = "UPDATE work_environment SET
            remote_allowed= :remote_allowed, 
            telework_allowed= :telework_allowed, 
            flexible_allowed= :flexible_allowed
            WHERE
            id = :id
            ;";
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':id', $basicWorkEnvironment->getId(), PDO::PARAM_INT);
        $sql->bindValue(':remote_allowed', $basicWorkEnvironment->getRemote_allowed(), PDO::PARAM_STR);
        $sql->bindValue(':telework_allowed', $basicWorkEnvironment->getTelework_allowed(), PDO::PARAM_STR);
        $sql->bindValue(':flexible_allowed', $basicWorkEnvironment->getFlexible_allowed(), PDO::PARAM_STR);
        
        $rowsmodified = 0;
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));           
            $rowsmodified = $sql->rowCount();
            
        } catch (PDOException $e) {
            return 'updateBasicWorkEnvironment failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rowsmodified;
    }
    
    /**
     * Add the work_environment_id, name, and description fields to the database.
     * 
     * NOTE: mime_type and size will NOT be added. They are added to the database 
     * along with the photo itself, not the metadata.
     * 
     * @param WorkplacePhotoCaption $workplacePhotoCaption
     * @return int $rowsModified
     */
    public static function insertUpdateWorkplacePhotoCaption($workplacePhotoCaption) {
        $link = BaseDAO::getConnection();
        $sqlStr = "INSERT INTO workplace_photo_caption
            (work_environment_id, photo_name, description)
            VALUES
            (:work_environment_id, :photo_name, :description)
            ON DUPLICATE KEY UPDATE
            description = :description_update
            ;";
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':work_environment_id', $workplacePhotoCaption->getWork_environment_id(), PDO::PARAM_INT);
        $sql->bindValue(':photo_name', $workplacePhotoCaption->getPhoto_name(), PDO::PARAM_STR);
        $sql->bindValue(':description', $workplacePhotoCaption->getDescription(), PDO::PARAM_STR);
        $sql->bindValue(':description_update', $workplacePhotoCaption->getDescription(), PDO::PARAM_STR);
        
        $rowsmodified = 0;
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));           
            $rowsmodified = $sql->rowCount();
 
        } catch (PDOException $e) {
            return 'insertUpdateWorkplacePhotoCaption failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rowsmodified;
    }
}