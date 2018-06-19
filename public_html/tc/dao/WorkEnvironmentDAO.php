<?php
	
    require_once __DIR__ . '/../config/php.config.inc';

    /*set api path*/
    set_include_path(get_include_path() . PATH_SEPARATOR);


/** Model Classes */
require_once __DIR__ . '/../dao/BaseDAO.php';
require_once __DIR__ . '/../model/WorkEnvironment.php';
require_once __DIR__ . '/../model/BasicWorkEnvironment.php';
require_once __DIR__ . '/../model/WorkplacePhotoCaption.php';
require_once __DIR__ . '/../model/File.php';

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
            if ($rowsmodified > 0) {
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
     * @param WorkplacePhotoCaption $workplacePhotoCaption
     * @return int $rowsModified
     */
    public static function insertWorkplacePhotoCaption($workplacePhotoCaption) {
        $link = BaseDAO::getConnection();
        $sqlStr = "INSERT INTO workplace_photo_caption
            (work_environment_id, photo_name, workplace_photo_id, description)
            VALUES
            (:work_environment_id, :photo_name, :photo_id, :description)
            ;";
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':work_environment_id', $workplacePhotoCaption->getWork_environment_id(), PDO::PARAM_INT);
        $sql->bindValue(':photo_name', $workplacePhotoCaption->getPhoto_name(), PDO::PARAM_STR);
        $sql->bindValue(':photo_id', $workplacePhotoCaption->getWorkplace_photo_id(), PDO::PARAM_INT);
        $sql->bindValue(':description', $workplacePhotoCaption->getDescription(), PDO::PARAM_STR);
        
        $rowsmodified = 0;
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));           
            $rowsmodified = $sql->rowCount();
 
        } catch (PDOException $e) {
            return 'insertWorkplacePhotoCaption failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rowsmodified;
    }
    
    /**
     * @param WorkplacePhotoCaption $workplacePhotoCaption
     * @return int $rowsModified
     */
    public static function updateWorkplacePhotoCaption($workplacePhotoCaption) {
        $link = BaseDAO::getConnection();
        $sqlStr = "UPDATE workplace_photo_caption
            SET
            workplace_photo_id = :photo_id,
            description = :description
            WHERE
            work_environment_id = :work_environment_id 
            AND photo_name = :photo_name
            
            ;";
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':work_environment_id', $workplacePhotoCaption->getWork_environment_id(), PDO::PARAM_INT);
        $sql->bindValue(':photo_name', $workplacePhotoCaption->getPhoto_name(), PDO::PARAM_STR);
        $sql->bindValue(':photo_id', $workplacePhotoCaption->getWorkplace_photo_id(), PDO::PARAM_INT);
        $sql->bindValue(':description', $workplacePhotoCaption->getDescription(), PDO::PARAM_STR);
        
        $rowsmodified = 0;
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));           
            $rowsmodified = $sql->rowCount();
 
        } catch (PDOException $e) {
            return 'updateWorkplacePhotoCaption failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rowsmodified;
    }
    
    /**
     * 
     * @param int $workEnvironmentId
     * @return BasicWorkEnvironment
     */
    public static function getBasicWorkEnvironment($workEnvironmentId) {
        $link = BaseDAO::getConnection();
        $sqlStr = "SELECT remote_allowed, telework_allowed, flexible_allowed, id
            FROM work_environment
            WHERE id = :id        
            ;";
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':id', $workEnvironmentId, PDO::PARAM_INT);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'BasicWorkEnvironment');
            $workEnvironment = $sql->fetch();
        } catch (PDOException $e) {
            return 'getBasicWorkEnvironment failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $workEnvironment;
    }
    
    public static function getWorkplacePhotoCaptions($workEnvironmentId) {
        $link = BaseDAO::getConnection();
        $sqlStr = "SELECT work_environment_id, photo_name, workplace_photo_id, description
            FROM workplace_photo_caption
            WHERE work_environment_id = :work_environment_id    
            ;";
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':work_environment_id', $workEnvironmentId, PDO::PARAM_INT);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'WorkplacePhotoCaption');
            $photoCaptions = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getWorkplacePhotoCaptions failed: ' . $e->getMessage();
        }
        return $photoCaptions;
    }
    
    public static function insertWorkplacePhoto($workplacePhoto) {
        $link = BaseDAO::getConnection();
        $sqlStr = "INSERT INTO workplace_photo
            (image, mime_type, size)
            VALUES
            (:image, :mime_type, :size)
            ;";
                
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':image', $workplacePhoto->getFile(), PDO::PARAM_LOB);
        $sql->bindValue(':mime_type', $workplacePhoto->getMime_type(), PDO::PARAM_STR);
        $sql->bindValue(':size', $workplacePhoto->getSize(), PDO::PARAM_INT);
        
        $insert_id = 0;
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));           
            $rowsmodified = $sql->rowCount();
            if ($rowsmodified > 0) {
                $insert_id = $link->lastInsertId();
            }
        } catch (PDOException $e) {
            return 'insertWorkplacePhoto failed: ' . $e->getMessage();
        }
        return $insert_id;
    }
    
    /**
     * 
     * @param int $manager_profile_id
     * @param string $photo_name
     * @return File
     */
    public static function getWorkplacePhoto($manager_profile_id, $photo_name) {
        $link = BaseDAO::getConnection();
        $sql_str = "
            SELECT
                photo.image as file, 
                photo.mime_type as mime_type, 
                photo.size as size
            FROM 
            talentcloud.workplace_photo photo, 
            talentcloud.manager_profile_to_work_environment env, 
            talentcloud.workplace_photo_caption cap
            WHERE 
                env.user_manager_profile_id = :manager_profile_id 
                AND env.work_environment_id = cap.work_environment_id
                AND cap.photo_name = :photo_name 
                AND cap.workplace_photo_id = photo.id
            ;
            ";
        $sql = $link->prepare($sql_str);
        $sql->bindValue(':manager_profile_id', $manager_profile_id, PDO::PARAM_INT);
        $sql->bindValue(':photo_name', $photo_name, PDO::PARAM_STR);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'File');
            $photo = $sql->fetch();
        } catch (PDOException $e) {
            return 'getWorkplacePhoto failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $photo;
    }
    
    public static function workplacePhotoExistsForManagerAndName($manager_profile_id, $photo_name) {
        $link = BaseDAO::getConnection();
        $sql_str = "
            SELECT EXISTS (SELECT 1 FROM 
                talentcloud.workplace_photo photo, 
                talentcloud.manager_profile_to_work_environment env, 
                talentcloud.workplace_photo_caption cap
            WHERE 
                env.user_manager_profile_id = :manager_profile_id 
                AND env.work_environment_id = cap.work_environment_id
                AND cap.photo_name = :photo_name 
                AND cap.workplace_photo_id = photo.id
            );
            ";
        $sql = $link->prepare($sql_str);
        $sql->bindValue(':manager_profile_id', $manager_profile_id, PDO::PARAM_INT);
        $sql->bindValue(':photo_name', $photo_name, PDO::PARAM_STR);
        

        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $result = $sql->fetch();
            $found = $result[0];
        } catch (PDOException $e) {
            return 'workplacePhotoExistsForManagerAndName failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $found == 1;
    }
    
    public static function updateWorkplacePhoto($image, $managerProfileId, $photoName) {
        $link = BaseDAO::getConnection();
        $sql_str = "
            UPDATE talentcloud.workplace_photo photo, talentcloud.manager_profile_to_work_environment env, talentcloud.workplace_photo_caption cap
            SET
            photo.image = :image, 
            photo.mime_type = :mime_type, 
            photo.size = :size
            WHERE 
                env.user_manager_profile_id = :manager_profile_id 
                AND env.work_environment_id = cap.work_environment_id
                AND cap.photo_name = :photo_name 
                AND cap.workplace_photo_id = photo.id
            ;";
        $sql = $link->prepare($sql_str);
        $sql->bindValue(':manager_profile_id', $managerProfileId, PDO::PARAM_INT);
        $sql->bindValue(':photo_name', $photoName, PDO::PARAM_STR);
        $sql->bindValue(':image', $image->getFile(), PDO::PARAM_LOB);
        $sql->bindValue(':mime_type', $image->getMime_type(), PDO::PARAM_STR);
        $sql->bindValue(':size', $image->getSize(), PDO::PARAM_INT);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));           
            $rowsmodified = $sql->rowCount();
        } catch (PDOException $e) {
            return 'insertWorkplacePhoto failed: ' . $e->getMessage();
        }
        return $rowsmodified;
    }
    
    /**
     * 
     * @param int $workEnvironmentId
     * @param string $photoName
     * @return WorkplacePhotoCaption
     */
    public static function getWorkplacePhotoCaptionByName($workEnvironmentId, $photoName) {
        $link = BaseDAO::getConnection();
        $sqlStr = "SELECT work_environment_id, photo_name, workplace_photo_id, description
            FROM workplace_photo_caption
            WHERE work_environment_id = :work_environment_id AND photo_name = :photo_name
            ;";
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':work_environment_id', $workEnvironmentId, PDO::PARAM_INT);
        $sql->bindValue(':photo_name', $photoName, PDO::PARAM_STR);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'WorkplacePhotoCaption');
            $photoCaption = $sql->fetch();
            
        } catch (PDOException $e) {
            return 'getWorkplacePhotoCaptionByName failed: ' . $e->getMessage();
        }
        return $photoCaption;
    }
    
    /**
     * 
     * @param int $managerProfileId
     * @param int $workEnvironmentId
     * @return int $rowsModified
     */
    public static function addManagerProfileIdForWorkEnvironment($managerProfileId, $workEnvironmentId) {
        $link = BaseDAO::getConnection();
        $sqlStr = "INSERT INTO `talentcloud`.`manager_profile_to_work_environment`
            (`user_manager_profile_id`, `work_environment_id`)
            VALUES
            (:manager_profile_id,:work_environment_id);";
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(":manager_profile_id", $managerProfileId, PDO::PARAM_INT);
        $sql->bindValue(":work_environment_id", $workEnvironmentId, PDO::PARAM_INT);

            try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $rowsModified = $sql->rowCount();
        } catch (PDOException $e) {
            BaseDAO::closeConnection($link);
            return 'addManagerProfileIdForWorkEnvironment failed: ' . $e->getMessage();
        }
        return $rowsModified;
    }
    
}