<?php

	
    date_default_timezone_set('America/Toronto');
    error_reporting(E_ALL);
    ini_set("display_errors", 1);
    set_time_limit(0);

    if (!isset($_SESSION)) {
        session_start();
    }

    /*set api path*/
    set_include_path(get_include_path() . PATH_SEPARATOR);

/** Model Classes */
require_once __DIR__ . '/../dao/BaseDAO.php';
require_once __DIR__ . '/../model/SkillDeclaration.php';

/**
 * Summary: Data Access Object for Resources
 * 
 * @extends BaseDAO
 */
class SkillDeclarationDAO extends BaseDAO {
    
    /**
     * Returns an array of SkillDeclaration objects associated with the criteria of a JobPosterApplication
     * 
     * @param type $jobPosterApplicationId
     */
    public static function getSkillDeclarationsForJobApplication($jobPosterApplicationId) {
            $link = BaseDAO::getConnection();
        
        $sqlStr = "
            SELECT 
                d.skill_declaration_id,
                c.criteria_name as skill,
                c.criteria_id as criteria_id,
                ct.criteria_type as criteria_type,
                d.experience_level_id,
                d.skill_level_id,
                d.description,
                d.last_updated
            FROM 
                skill_declaration d, 
                criteria c,
                criteria_type ct
            WHERE
                d.job_poster_application_id = :job_poster_application_id
                AND d.criteria_id = c.criteria_id
                AND c.criteria_type_id = ct.criteria_type_id
                AND d.is_active = 1
                AND d.skill_declaration_id IN (
                    SELECT MAX(skill_declaration_id)
                    FROM skill_declaration
                    WHERE job_poster_application_id = :job_poster_application_id_2
                    GROUP BY criteria_id
                );
            ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':job_poster_application_id', $jobPosterApplicationId, PDO::PARAM_INT);
        $sql->bindValue(':job_poster_application_id_2', $jobPosterApplicationId, PDO::PARAM_INT);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'SkillDeclaration');
            
            $declarations = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getSkillDeclarationsForJobApplication failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
                
        return $declarations;
    }
    
    /**
     * 
     * @param int $jobPosterApplicationId
     * @param int $criteriaId
     * @param SkillDeclaration $skillDeclaration
     * @param boolean $isEssenetial
     * @return type
     */
    public static function putSkillDeclarationForJobApplication($jobPosterApplicationId, $criteriaId, $skillDeclaration) {
        $link = BaseDAO::getConnection();
        
        $sql_str_declaration = "
            INSERT INTO skill_declaration
                (job_poster_application_id,
                criteria_id,
                experience_level_id,
                skill_level_id,
                description,
                is_active)                
            VALUES
                (:job_poster_application_id,
                :criteria_id,
                :experience_level_id,
                :skill_level_id,
                :description,
                1)
            ;";
        
        $sql_declaration = $link->prepare($sql_str_declaration);
        $sql_declaration->bindValue(':experience_level_id', $skillDeclaration->getExperience_level_id(), PDO::PARAM_INT);
        $sql_declaration->bindValue(':skill_level_id', $skillDeclaration->getSkill_level_id(), PDO::PARAM_INT);
        $sql_declaration->bindValue(':description', $skillDeclaration->getDescription(), PDO::PARAM_STR);
        $sql_declaration->bindValue(':job_poster_application_id', $jobPosterApplicationId, PDO::PARAM_INT);
        $sql_declaration->bindValue(':criteria_id', $criteriaId, PDO::PARAM_INT);
        
        try {
            $sql_declaration->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $declaration_id = $link->lastInsertId();          
                     
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
    public static function removeSkillDeclarationFromJobApplication($jobPosterApplicationId, $criteriaId) {
        $link = BaseDAO::getConnection();
        
        $sql_str_deactivation = "
            UPDATE skill_declaration 
            SET is_active=0 
            WHERE 
                job_poster_application_id = :job_poster_application_id
                AND criteria_id = :criteria_id
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
    
    public static function getMostRecentDeclarationForUserAndSkill($userId, $skillName) {
        $link = BaseDAO::getConnection();
        
        $sql_str = "
            SELECT 
                d.skill_declaration_id,
                c.criteria_name as skill,
                c.criteria_id as criteria_id,
                ct.criteria_type as criteria_type,
                d.experience_level_id,
                d.skill_level_id,
                d.description,
                d.last_updated
            FROM 
                skill_declaration d, 
                criteria c,
                criteria_type ct,
                job_poster_application jpa,
                user_job_seeker_profiles u_jsp
            WHERE
                d.job_poster_application_id = jpa.job_poster_application_id
                AND d.criteria_id = c.criteria_id
                AND jpa.application_job_seeker_profile_id = u_jsp.job_seeker_profile_id
                AND u_jsp.user_id = :user_id
                AND c.criteria_name = :skill_name
                AND c.criteria_type_id = ct.criteria_type_id
                AND d.is_active = 1
            ORDER BY d.last_updated DESC LIMIT 1
            ;";
        
        $sql = $link->prepare($sql_str);
        $sql->bindValue(':user_id', $userId, PDO::PARAM_INT);
        $sql->bindValue(':skill_name', $skillName, PDO::PARAM_STR);
        
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