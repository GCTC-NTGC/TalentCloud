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
class JobApplicationDAO extends BaseDAO {
    
    public static function getApplicationQuestionAnswersByApplicationId($jobPosterApplicationId) {
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
            SELECT 
                qa.application_question_answer_id as qa_id,
                qa.job_poster_application_id as application_id,
                qa.question as question,
                qa.answer as answer
            FROM application_question_answer as qa
            WHERE
                qa.job_poster_application_id = :job_poster_application_id
            ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':job_poster_application_id', $jobPosterApplicationId, PDO::PARAM_INT);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'ApplicationQuestionAnswer', array('application_question_answer_id', 'job_poster_application_id','question','answer'));
            
            $questionAnswers = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getApplicationQuestionAnswersByApplicationId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $questionAnswers;
    }
    
    public static function getJobPosterApplicationByApplicationId($jobPosterApplicationId) {
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
        SELECT 
            jpa.job_poster_application_id,
            jpa.application_job_poster_id,
            jpa.application_job_seeker_profile_id
        FROM job_poster_application jpa
        WHERE
        jpa.job_poster_application_id = :job_poster_application_id
        ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':job_poster_application_id', $jobPosterApplicationId, PDO::PARAM_INT);
       
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            //$link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'JobPosterApplication',array('job_poster_application_id', 'application_job_poster_id','application_job_seeker_profile_id'));
            $jobPosterApplication = $sql->fetch();            
        } catch (PDOException $e) {
            return 'getJobPosterApplicationByApplicationId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $jobPosterApplication;
    }
    
    public static function getJobPosterApplicationsByJobPosterId($jobPosterId) {
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
        SELECT 
            jpa.job_poster_application_id,
            jpa.application_job_poster_id,
            jpa.application_job_seeker_profile_id
        FROM job_poster_application jpa
        WHERE
        jpa.application_job_poster_id = :job_poster_id
        ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':job_poster_id', $jobPosterId, PDO::PARAM_INT);
       
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            //$link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'JobPosterApplication',array('job_poster_application_id', 'application_job_poster_id','application_job_seeker_profile_id'));
            $jobPosterApplications = $sql->fetchAll();            
        } catch (PDOException $e) {
            return 'getJobPosterApplicationsByJobPosterId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $jobPosterApplications;
    }
    
    public static function getJobPosterApplicationsByJobSeekerProfileId($jobSeekerProfileId) {
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
        SELECT 
            jpa.job_poster_application_id,
            jpa.application_job_poster_id,
            jpa.application_job_seeker_profile_id
        FROM job_poster_application jpa
        WHERE
        jpa.application_job_seeker_profile_id = :job_seeker_profile_id
        ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':job_seeker_profile_id', $jobSeekerProfileId, PDO::PARAM_INT);
       
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            //$link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'JobPosterApplication',array('job_poster_application_id', 'application_job_poster_id','application_job_seeker_profile_id'));
            $jobPosterApplications = $sql->fetchAll();            
        } catch (PDOException $e) {
            return 'getJobPosterApplicationsByJobPosterId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $jobPosterApplications;
    }
    
    
}