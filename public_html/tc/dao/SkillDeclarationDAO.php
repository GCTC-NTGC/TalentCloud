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
require_once '../model/SkillDeclaration.php';

/**
 * Summary: Data Access Object for Resources
 * 
 * @extends BaseDAO
 */
class SkillDeclarationDAO extends BaseDAO {
    
    /**
     * Returns an array of SkillDeclaration objects associated with the Essential criteria of a JobPosterApplication
     * 
     * @param type $jobPosterApplicationId
     */
    public static function getEssentialSkillDeclarationsForJobApplication($jobPosterApplicationId) {
         $link = BaseDAO::getConnection();
        
        $sqlStr = "
            SELECT 
                d.skill_declaration_id,
                cc.core_competency as skill,
                d.experience_level_id,
                d.skill_level_id,
                d.description,
                d.last_updated
            FROM 
                skill_declaration d, 
                application_essential_skill_declaration asd,
                job_poster_core_competency cc
            WHERE
                d.skill_declaration_id = asd.skill_declaration_id
                AND asd.job_poster_application_id = :job_poster_application_id
                AND asd.job_poster_core_competency_id = cc.job_poster_core_competency_id
                AND asd.is_active = 1
            ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':job_poster_application_id', $jobPosterApplicationId, PDO::PARAM_INT);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'SkillDeclaration');
            
            $declarations = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getEssentialSkillDeclarationsForJobApplication failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
                
        return $declarations;
    }
    
    /**
     * Returns an array of SkillDeclaration objects associated with the Asset criteria of a JobPosterApplication
     * 
     * @param type $jobPosterApplicationId
     */
    public static function getAssetSkillDeclarationsForJobApplication($jobPosterApplicationId) {
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
            SELECT 
                d.skill_declaration_id,
                dc.developing_competency as skill,
                d.experience_level_id,
                d.skill_level_id,
                d.description,
                d.last_updated
            FROM 
                skill_declaration d, 
                application_asset_skill_declaration asd,
                job_poster_developing_competency dc
            WHERE
                d.skill_declaration_id = asd.skill_declaration_id
                AND asd.job_poster_application_id = :job_poster_application_id
                AND asd.job_poster_developing_competency_id = dc.job_poster_developing_competency_id
                AND asd.is_active = 1
            ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':job_poster_application_id', $jobPosterApplicationId, PDO::PARAM_INT);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'SkillDeclaration');
            
            $declarations = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getAssetSkillDeclarationsForJobApplication failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
                
        return $declarations;
    }
    
    /**
     * 
     * @param int $jobPosterApplicationId
     * @param int $criteriaId
     * @param SkillDeclaration $skillDeclaration
     * @return type
     */
    public static function putEssentialSkillDeclarationForJobApplication($jobPosterApplicationId, $criteriaId, $skillDeclaration) {
        return self::putSkillDeclarationForJobApplication($jobPosterApplicationId, $criteriaId, $skillDeclaration, true);
    }
    
    /**
     * 
     * @param int $jobPosterApplicationId
     * @param int $criteriaId
     * @param SkillDeclaration $skillDeclaration
     * @return type
     */
    public static function putAssetSkillDeclarationForJobApplication($jobPosterApplicationId, $criteriaId, $skillDeclaration) {
        return self::putSkillDeclarationForJobApplication($jobPosterApplicationId, $criteriaId, $skillDeclaration, false);
    }
    
    /**
     * 
     * @param int $jobPosterApplicationId
     * @param int $criteriaId
     * @param SkillDeclaration $skillDeclaration
     * @param boolean $isEssenetial
     * @return type
     */
    private static function putSkillDeclarationForJobApplication($jobPosterApplicationId, $criteriaId, $skillDeclaration, $isEssential) {
        $link = BaseDAO::getConnection();
        
        $sql_str_declaration = "
            INSERT INTO skill_declaration
                (experience_level_id,
                skill_level_id,
                description)
            VALUES
                (:experience_level_id,
                :skill_level_id,
                :description)
            ;";
        
        $sql_str_id = "SELECT LAST_INSERT_ID() INTO @skill_declaration_id;";
        
        $linkingTableName = $isEssential ? "application_essential_skill_declaration" : "application_asset_skill_declaration";
        $criteriaIdColumn = $isEssential ?  "job_poster_core_competency_id" : "job_poster_developing_competency_id";
        
        $sql_str_deactivation = "
            UPDATE $linkingTableName 
            SET is_active=0 
            WHERE 
                job_poster_application_id = :job_poster_application_id
                AND $criteriaId = :criteria_id
            ;";
        
        $sql_str_application_declaration = "
            INSERT INTO $linkingTableName
            (job_poster_application_id, $criteriaIdColumn, skill_declaration_id, is_active)
            VALUES
            (:job_poster_application_id, :criteria_id, @skill_declaration_id, 1)
            ;";
            
        
        $sql_declaration = $link->prepare($sql_str_declaration);
        $sql_declaration->bindValue(':experience_level_id', $skillDeclaration->getExperience_level_id(), PDO::PARAM_INT);
        $sql_declaration->bindValue(':skill_level_id', $skillDeclaration->getSkill_level_id(), PDO::PARAM_INT);
        $sql_declaration->bindValue(':description', $skillDeclaration->getDescription(), PDO::PARAM_STR);
        
        $sql_id = $link->prepare($sql_str_id);
        
        $sql_deactivation = $link->prepare($sql_str_deactivation);
        $sql_deactivation->bindValue(':job_poster_application_id', $jobPosterApplicationId, PDO::PARAM_INT);
        $sql_deactivation->bindValue(':criteria_id', $criteriaId, PDO::PARAM_INT);
        
        $sql_application_declaration = $link->prepare($sql_str_application_declaration);
        $sql_application_declaration->bindValue(':job_poster_application_id', $jobPosterApplicationId, PDO::PARAM_INT);
        $sql_application_declaration->bindValue(':criteria_id', $criteriaId, PDO::PARAM_INT);
        
        
        try {
            $link->beginTransaction();
            $sql_declaration->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $declaration_id = $link->lastInsertId();
            $sql_id->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql_deactivation->execute() or die("ERROR: " . implode(":", $link->errorInfo()));     
            $sql_application_declaration->execute() or die("ERROR: " . implode(":", $link->errorInfo()));            
            $link->commit();            
                     
        } catch (PDOException $e) {
            return 'putSkillDeclarationForJobApplication failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
                
        return $declaration_id;
    }
    
    /**
     * 
     * @param int $jobPosterApplicationId
     * @param int $criteriaId
     * @param boolean $isEssential
     * @return int rows_modified
     */
    private static function removeSkillDeclarationFromJobApplication($jobPosterApplicationId, $criteriaId, $isEssential) {
        $link = BaseDAO::getConnection();
        
        $linkingTableName = $isEssential ? "application_essential_skill_declaration" : "application_asset_skill_declaration";
        //$criteriaIdColumn = $isEssential ?  "job_poster_core_competency_id" : "job_poster_developing_competency_id";
        
        $sql_str_deactivation = "
            UPDATE $linkingTableName 
            SET is_active=0 
            WHERE 
                job_poster_application_id = :job_poster_application_id
                AND $criteriaId = :criteria_id
            ;";
        
        $sql_deactivation = $link->prepare($sql_str_deactivation);
        $sql_deactivation->bindValue(':job_poster_application_id', $jobPosterApplicationId, PDO::PARAM_INT);
        $sql_deactivation->bindValue(':criteria_id', $criteriaId, PDO::PARAM_INT);
        
        try {     
            $sql_deactivation->execute() or die("ERROR: " . implode(":", $link->errorInfo()));     
            $rows_modified = $sql_deactivation->rowCount();    
        } catch (PDOException $e) {
            return 'removeSkillDeclarationFromJobApplication failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
                
        return $rows_modified;
    }
    
    /**
     * 
     * @param int $jobPosterApplicationId
     * @param int $criteriaId
     * @return int rows_modified
     */
    public static function removeEssentialSkillDeclarationFromJobApplication($jobPosterApplicationId, $criteriaId) {
        return self::removeSkillDeclarationFromJobApplication($jobPosterApplicationId, $criteriaId, true);
    }
    
    /**
     * 
     * @param int $jobPosterApplicationId
     * @param int $criteriaId
     * @return int rows_modified
     */
    public static function removeAssetSkillDeclarationFromJobApplication($jobPosterApplicationId, $criteriaId) {
        return self::removeSkillDeclarationFromJobApplication($jobPosterApplicationId, $criteriaId, false);
    }
    
    public static function getMostRecentDeclarationForUserAndSkill($userId, $skillName) {
        $link = BaseDAO::getConnection();
        
        $sql_str = "
            SELECT 
                d.skill_declaration_id,
                c.developing_competency as skill,
                d.experience_level_id,
                d.skill_level_id,
                d.description,
                d.last_updated
            FROM 
                skill_declaration d, 
                application_asset_skill_declaration asd,
                job_poster_developing_competency c,
                job_poster_application jpa,
                user_job_seeker_profiles u_jsp
            WHERE
                d.skill_declaration_id = asd.skill_declaration_id
                AND asd.job_poster_application_id = jpa.job_poster_application_id
                AND asd.job_poster_developing_competency_id = c.job_poster_developing_competency_id
                AND jpa.application_job_seeker_profile_id = u_jsp.job_seeker_profile_id
                AND u_jsp.user_id = :user_id
                AND c.developing_competency = :skill_name
            UNION
            SELECT 
               d.skill_declaration_id,
               c.core_competency as skill,
               d.experience_level_id,
               d.skill_level_id,
               d.description,
               d.last_updated
           FROM 
               skill_declaration d, 
               application_essential_skill_declaration asd,
               job_poster_core_competency c,
               job_poster_application jpa,
               user_job_seeker_profiles u_jsp
           WHERE
               d.skill_declaration_id = asd.skill_declaration_id
               AND asd.job_poster_application_id = jpa.job_poster_application_id
               AND asd.job_poster_core_competency_id = c.job_poster_core_competency_id
               AND jpa.application_job_seeker_profile_id = u_jsp.job_seeker_profile_id
               AND u_jsp.user_id = :user_id_2
               AND c.core_competency = :skill_name_2
            ORDER BY last_updated DESC LIMIT 1
            ;";
        
        $sql = $link->prepare($sql_str);
        $sql->bindValue(':user_id', $userId, PDO::PARAM_INT);
        $sql->bindValue(':skill_name', $skillName, PDO::PARAM_STR);
        $sql->bindValue(':user_id_2', $userId, PDO::PARAM_INT);
        $sql->bindValue(':skill_name_2', $skillName, PDO::PARAM_STR);
        
        try {     
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'SkillDeclaration');
            
            $declaration = $sql->fetch();
        } catch (PDOException $e) {
            return 'getMostRecentDeclarationForUserAndSkill failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
                
        return $declaration;
    }
}