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
require_once '../model/WorkSample.php';
require_once '../model/ApplicationWorkSample.php';

/**
 * Summary: Data Access Object for Resources
 * 
 * @extends BaseDAO
 */
class WorkSampleDAO extends BaseDAO {
    
    /**
     * Returns an array of ApplicationWorkSample objects: the most recent (active) sample
     * for each criteria of a given Job Application
     * 
     * @param ApplicationWorkSample[] $workSamples
     */
    public static function getWorkSamplesForJobApplication($jobPosterApplicationId, $locale) {
         $link = BaseDAO::getConnection();
        
        $sqlStr = "
            SELECT 
                application_work_sample.criteria_id,
                w.work_sample_id,
                w.work_sample_name,
                w.work_sample_date_created,
                file_type_details.file_type_details_name as file_type,
                w.work_sample_url,
                w.work_sample_story                
            FROM 
                work_sample w,
                locale,
                file_type_details,
                application_work_sample
            WHERE
                application_work_sample.job_poster_application_id = :job_poster_application_id
                AND application_work_sample.work_sample_id = w.work_sample_id
                AND w.file_type_id = file_type_details.file_type_id
                AND file_type_details.locale_id = locale.locale_id
                AND locale.locale_iso = :locale
                AND application_work_sample.is_active = 1
                AND application_work_sample.application_work_sample_id IN (
                    SELECT MAX(application_work_sample_id)
                    FROM application_work_sample
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
            
            $workSampleArrays = $sql->fetchAll();
            $workSamples = [];
            foreach($workSampleArrays as $workSampleArray) {
                $basicWorkSample = new WorkSample();
                $basicWorkSample->setWork_sample_id($workSampleArray['work_sample_id']);
                $basicWorkSample->setWork_sample_name($workSampleArray['work_sample_name']);
                $basicWorkSample->setWork_sample_date_created($workSampleArray['work_sample_date_created']);
                $basicWorkSample->setFile_type($workSampleArray['file_type']);
                $basicWorkSample->setWork_sample_url($workSampleArray['work_sample_url']);
                $basicWorkSample->setWork_sample_story($workSampleArray['work_sample_story']);
                
                $applicationWorkSample = new ApplicationWorkSample($workSampleArray['criteria_id'], $basicWorkSample);
                $workSamples[] = $applicationWorkSample;
            }            
        } catch (PDOException $e) {
            return 'getWorkSamplesForJobApplication failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
                
        return $workSamples;
    }
    
    /**
     * 
     * @param int $jobPosterApplicationId
     * @param int $criteriaId
     * @param WorkSample $workSample
     * @return int $application_work_sample_id
     */
    public static function putWorkSampleForJobApplication($jobPosterApplicationId, $criteriaId, WorkSample $workSample) {
        $link = BaseDAO::getConnection();
        
        $sql_str_work_sample = "
            INSERT INTO work_sample
                (work_sample_name,
                work_sample_date_created,
                file_type_id,
                work_sample_url,
                work_sample_story)                
            VALUES
                (:work_sample_name,
                :work_sample_date_created,
                (SELECT file_type_id FROM file_type_details WHERE file_type_details_name = :file_type LIMIT 1),
                :work_sample_url,
                :work_sample_story
                )
            ;";
        
        $sql_str_id = "SELECT LAST_INSERT_ID() INTO @work_sample_id;";
        
        $sql_str_application_work_sample = "
            INSERT INTO application_work_sample
                (job_poster_application_id,
                criteria_id,
                work_sample_id,
                is_active)
            VALUES
                (:job_poster_application_id,
                :criteria_id,
                @work_sample_id,
                1)
            ;";
        
        $sql_work_sample = $link->prepare($sql_str_work_sample);
        $sql_work_sample->bindValue(':work_sample_name', $workSample->getWork_sample_name(), PDO::PARAM_STR);
        $sql_work_sample->bindValue(':work_sample_date_created', $workSample->getWork_sample_date_created(), PDO::PARAM_STR);
        $sql_work_sample->bindValue(':file_type', $workSample->getFile_type(), PDO::PARAM_STR);
        $sql_work_sample->bindValue(':work_sample_url', $workSample->getWork_sample_url(), PDO::PARAM_STR);
        $sql_work_sample->bindValue(':work_sample_story', $workSample->getWork_sample_story(), PDO::PARAM_STR);
        
        $sql_id = $link->prepare($sql_str_id);
        
        $sql_application_work_sample = $link->prepare($sql_str_application_work_sample);
        
        $sql_application_work_sample->bindValue(':job_poster_application_id', $jobPosterApplicationId, PDO::PARAM_INT);
        $sql_application_work_sample->bindValue(':criteria_id', $criteriaId, PDO::PARAM_INT);
        
        try {
            $link->beginTransaction();
            $sql_work_sample->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql_id->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql_application_work_sample->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $application_work_sample_id = $link->lastInsertId();   
            $link->commit();
                     
        } catch (PDOException $e) {
            return 'putWorkSampleForJobApplication failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
                
        return $application_work_sample_id;
    }
    
    /**
     * Sets all ApplicationWorkSamples asociated with the given application and criteria
     * to inactive.
     * 
     * @param int $jobPosterApplicationId
     * @param int $criteriaId
     * @return int rows_modified
     */
    public static function removeWorkSampleFromJobApplication($jobPosterApplicationId, $criteriaId) {
        $link = BaseDAO::getConnection();
        
        $sql_str_deactivation = "
            UPDATE application_work_sample 
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
            return 'removeWorkSampleFromJobApplication failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
                
        return $rows_modified;
    }
}