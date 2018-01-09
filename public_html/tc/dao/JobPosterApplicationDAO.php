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
require_once '../model/JobPosterApplication.php';

/**
 * Summary: Data Access Object for Resources
 * 
 * @extends BaseDAO
 */
class JobPosterApplicationDAO extends BaseDAO {

    public static function addJobPosterApplication($jobPosterId, $jobSeekerProfileId){
                
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
               INSERT INTO job_poster_application
                (
                application_job_poster_id,
                application_job_seeker_profile_id
                )
                VALUES
                (
                :application_job_poster_id,
                :application_job_seeker_profile_id
                );
            ";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':application_job_poster_id', $jobPosterId, PDO::PARAM_INT);
        $sql->bindParam(':application_job_seeker_profile_id', $jobSeekerProfileId, PDO::PARAM_INT);

        $rowsmodified = 0;
        
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            //$link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $rowsmodified = $sql->rowCount();
            if($rowsmodified > 0){
                $insert_id = $link->lastInsertId();
            }
        } catch (PDOException $e) {
            return 'getJobSeekersByUserId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $insert_id;
    }
    
    public static function getJobPosterApplicationByProfileId($jobPosterId, $jobSeekerProfileId){
        
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
        SELECT jpa.job_poster_application_id
        FROM job_poster_application jpa
        WHERE
        jpa.application_job_poster_id = :application_job_poster_id
        AND
        jpa.application_job_seeker_profile_id = :application_job_seeker_profile_id;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':application_job_poster_id', $jobPosterId, PDO::PARAM_INT);
        $sql->bindParam(':application_job_seeker_profile_id', $jobSeekerProfileId, PDO::PARAM_INT);

        $job_poster_application_id;
        
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            //$link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_ASSOC);
            $result = $sql->fetch();
            $job_poster_application_id = $result['job_poster_application_id'];
            
        } catch (PDOException $e) {
            return 'getJobSeekersByUserId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $job_poster_application_id;
    }
    
}

?>