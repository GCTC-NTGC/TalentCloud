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
require_once '../model/MicroReference.php';
require_once '../model/ApplicationMicroReference.php';

/**
 * Summary: Data Access Object for Resources
 * 
 * @extends BaseDAO
 */
class MicroReferenceDAO extends BaseDAO {
    
    /**
     * Returns an array of ApplicationMicroReference objects: the most recent (active) sample
     * for each criteria of a given Job Application
     * 
     * @param ApplicationMicroReference[] $references
     */
    public static function getApplicationMicroReferencesForJobApplication($jobPosterApplicationId, $locale) {
         $link = BaseDAO::getConnection();
        
        $sqlStr = "
            SELECT 
                application_micro_reference.criteria_id as criteria_id,
                micro_reference.micro_reference_id,
                micro_reference.micro_reference_name,
                micro_reference.micro_reference_email,
                relationship_details.relationship_details_name as relationship,
                micro_reference.micro_reference_observed_from_date as observed_from_date,
                micro_reference.micro_reference_observed_until_date as observed_until_date,
                experience_level_details.experience_level_details_name as experience_level,
                micro_reference.micro_reference_story                
            FROM 
                micro_reference,
                locale,
                relationship_details,
                experience_level_details,
                application_micro_reference
            WHERE
                application_micro_reference.job_poster_application_id = :job_poster_application_id
                AND application_micro_reference.micro_reference_id = micro_reference.micro_reference_id
                AND micro_reference.micro_reference_relationship_id = relationship_details.relationship_id
                AND relationship_details.locale_id = locale.locale_id
                AND locale.locale_iso = :locale
                AND micro_reference.micro_reference_experience_level_id = experience_level_details.experience_level_id
                AND experience_level_details.experience_level_details_locale_id = locale.locale_id
                AND application_micro_reference.is_active = 1
                AND application_micro_reference.application_micro_reference_id IN (
                    SELECT MAX(application_micro_reference_id)
                    FROM application_micro_reference
                    WHERE job_poster_application_id = :job_poster_application_id_2
                    GROUP BY criteria_id
                );
            ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':job_poster_application_id', $jobPosterApplicationId, PDO::PARAM_INT);
        $sql->bindValue(':job_poster_application_id_2', $jobPosterApplicationId, PDO::PARAM_INT);
        $sql->bindValue(':locale', $locale, PDO::PARAM_STR);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_ASSOC|PDO::FETCH_PROPS_LATE);
            
            $referenceArrays = $sql->fetchAll();
            $references = [];
            foreach($referenceArrays as $referenceArray) {
                $basicReference = new MicroReference();
                $basicReference->setMicro_reference_id($referenceArray['micro_reference_id']);
                $basicReference->setMicro_reference_name($referenceArray['micro_reference_name']);
                $basicReference->setMicro_reference_email($referenceArray['micro_reference_email']);
                $basicReference->setRelationship($referenceArray['relationship']);
                $basicReference->setObserved_from_date($referenceArray['observed_from_date']);
                $basicReference->setObserved_until_date($referenceArray['observed_until_date']);
                $basicReference->setExperience_level($referenceArray['experience_level']);
                $basicReference->setMicro_reference_story($referenceArray['micro_reference_story']);
                
                $applicationMicroReference = new ApplicationMicroReference($referenceArray['criteria_id'], $jobPosterApplicationId, $basicReference);
                $references[] = $applicationMicroReference;
            }            
        } catch (PDOException $e) {
            return 'getApplicationMicroReferencesForJobApplication failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
                
        return $references;
    }
    
    /**
     * 
     * @param int $jobPosterApplicationId
     * @param int $criteriaId
     * @param MicroReference $microReference
     * @return int $application_micro_reference_id
     */
    public static function putMicroReferenceForJobApplication($jobPosterApplicationId, $criteriaId, MicroReference $microReference) {
        $link = BaseDAO::getConnection();
        
        $sql_str_micro_reference = "
            INSERT INTO micro_reference
                (micro_reference_name,
                micro_reference_email,
                micro_reference_relationship_id,
                micro_reference_observed_from_date,
                micro_reference_observed_until_date,
                micro_reference_experience_level_id,
                micro_reference_story)                
            VALUES
                (:name,
                :email,
                (SELECT relationship_id FROM relationship_details WHERE relationship_details_name = :relationship LIMIT 1),
                :from_date,
                :until_date,
                (SELECT experience_level_id FROM experience_level_details WHERE experience_level_details_name = :experience_level LIMIT 1),
                :story
                )
            ;";
        
        $sql_str_id = "SELECT LAST_INSERT_ID() INTO @micro_reference_id;";
        
        $sql_str_application_micro_reference = "
            INSERT INTO application_micro_reference
                (job_poster_application_id,
                criteria_id,
                micro_reference_id,
                is_active)
            VALUES
                (:job_poster_application_id,
                :criteria_id,
                @micro_reference_id,
                1)
            ;";
        
        $sql_micro_reference = $link->prepare($sql_str_micro_reference);
        $sql_micro_reference->bindValue(':name', $microReference->getMicro_reference_name(), PDO::PARAM_STR);
        $sql_micro_reference->bindValue(':email', $microReference->getMicro_reference_email(), PDO::PARAM_STR);
        $sql_micro_reference->bindValue(':relationship', $microReference->getRelationship(), PDO::PARAM_STR);
        $sql_micro_reference->bindValue(':from_date', $microReference->getObserved_from_date(), PDO::PARAM_STR);
        $sql_micro_reference->bindValue(':until_date', $microReference->getObserved_until_date(), PDO::PARAM_STR);
        $sql_micro_reference->bindValue(':experience_level', $microReference->getExperience_level(), PDO::PARAM_STR);
        $sql_micro_reference->bindValue(':story', $microReference->getMicro_reference_story(), PDO::PARAM_STR);
        
        
        $sql_id = $link->prepare($sql_str_id);
        
        $sql_application_micro_reference = $link->prepare($sql_str_application_micro_reference);
        
        $sql_application_micro_reference->bindValue(':job_poster_application_id', $jobPosterApplicationId, PDO::PARAM_INT);
        $sql_application_micro_reference->bindValue(':criteria_id', $criteriaId, PDO::PARAM_INT);
        
        try {
            $link->beginTransaction();
            $sql_micro_reference->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql_id->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql_application_micro_reference->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $application_micro_reference_id = $link->lastInsertId();   
            $link->commit();
                     
        } catch (PDOException $e) {
            return 'putMicroReferenceForJobApplication failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
                
        return $application_micro_reference_id;
    }
    
    /**
     * Sets all ApplicationMicroReferences associated with the given application and criteria
     * to inactive.
     * 
     * @param int $jobPosterApplicationId
     * @param int $criteriaId
     * @return int rows_modified
     */
    public static function removeMicroReferenceFromJobApplication($jobPosterApplicationId, $criteriaId) {
        $link = BaseDAO::getConnection();
        
        $sql_str_deactivation = "
            UPDATE application_micro_reference 
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
            return 'removeMicroReferenceFromJobApplication failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
                
        return $rows_modified;
    }
}