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
                dc.core_competency as skill,
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
}