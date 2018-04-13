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
     * Returns an array of Evidence objects associated with a JobPosterApplication
     * 
     * @param type $jobPosterApplicationId
     */
    public static function getSkillDeclarationsForJobApplication($jobPosterApplicationId) {
         $link = BaseDAO::getConnection();
        
        $sqlStr = "
            SELECT 
                e.evidence_id,
                e.experience_level_id,
                e.skill_level_id,
                e.evidence_description,
                e.last_updated
            FROM evidence e, application_evidence ae
            WHERE
                e.evidence_id = ae.evidence_id
                AND ae.job_poster_application_id = :job_poster_application_id
            ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':job_poster_application_id', $jobPosterApplicationId, PDO::PARAM_INT);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'Evidence');
            
            $evidence = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getEvidenceForJobApplication failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        
        foreach ($evidence as $e) {
            self::getSkillIdsForEvidence($e->getEvidence_id());
        }
        
        return $evidence;
    }
    
    /**
     * Returns an array of skill ids associated with an evidence object
     * 
     * @param type $evidence_id
     */
    public static function getSkillIdsForEvidence($evidence_id) {
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
            SELECT evidence_skill.skill_id
            FROM evidence_skill
            WHERE evidence_skill.evidence_id = :evidence_id;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':evidence_id', $evidence_id, PDO::PARAM_INT);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_NUM);
            
            $result = $sql->fetchAll(); //is returned as an array of arrays
            $skill_ids = empty($result) ? [] : array_merge(...$result); //Merge into a single layer array if result is not empty
        } catch (PDOException $e) {
            return 'getSkillIdsForEvidence failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $skill_ids;
    }
    
    public static function insertEvidence($evidence) {
        
    }
}