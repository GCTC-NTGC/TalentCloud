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
    
    /**
     * 
     * Returns an array of ApplicationQuestionAnswer objects associated with
     * a given job_poster_application_id.
     * 
     * @param int $jobPosterApplicationId
     * @return ApplicationQuestionAnswer[]
     */
    public static function getApplicationQuestionAnswersByApplicationId($jobPosterApplicationId) {
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
            SELECT 
                answer.job_application_id as job_poster_application_id,
                answer.job_poster_question_id as job_poster_question_id,
                question.question as question,
                answer.answer as answer
            FROM job_application_answer as answer, job_poster_question question
            WHERE
                answer.job_application_id = :job_poster_application_id
                AND answer.job_poster_question_id = question.id
            ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':job_poster_application_id', $jobPosterApplicationId, PDO::PARAM_INT);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'ApplicationQuestionAnswer');
            
            $questionAnswers = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getApplicationQuestionAnswersByApplicationId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $questionAnswers;
    }
    
    /**
     * Returns the JobPosterApplicaiton object with the supplied job_poster_application_id.
     * 
     * @param int $jobPosterApplicationId
     * @return JobPosterApplication
     */
    public static function getJobPosterApplicationByApplicationId($jobPosterApplicationId) {
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
        SELECT 
            jpa.job_poster_application_id,
            jpa.application_job_poster_id,
            jpa.application_job_seeker_profile_id,
            jpa.job_poster_application_status_id
        FROM job_poster_application jpa
        WHERE
        jpa.job_poster_application_id = :job_poster_application_id
        ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':job_poster_application_id', $jobPosterApplicationId, PDO::PARAM_INT);
       
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            //$link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'JobPosterApplication');
            $jobPosterApplication = $sql->fetch();            
        } catch (PDOException $e) {
            return 'getJobPosterApplicationByApplicationId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $jobPosterApplication;
    }
    
    /**
     * Returns the most recent JobPosterApplicaiton object with the supplied job_poster_application_id.
     * 
     * @param int $jobPosterApplicationId
     * @return JobPosterApplication
     */
    public static function getJobApplicationByJobAndUser($jobPosterId, $userId) {
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
        SELECT 
            jpa.job_poster_application_id,
            jpa.application_job_poster_id,
            jpa.application_job_seeker_profile_id,
            jpa.job_poster_application_status_id
        FROM job_poster_application jpa, user_job_seeker_profiles u_jsp
        WHERE
        jpa.application_job_poster_id = :job_poster_id
        AND u_jsp.job_seeker_profile_id = jpa.application_job_seeker_profile_id
        AND u_jsp.user_id = :user_id
        ORDER BY jpa.last_updated DESC LIMIT 1
        ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':job_poster_id', $jobPosterId, PDO::PARAM_INT);
        $sql->bindValue(':user_id', $userId, PDO::PARAM_INT);
        
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            //$link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'JobPosterApplication');
            $jobPosterApplication = $sql->fetch();            
        } catch (PDOException $e) {
            return 'getJobPosterApplicationByApplicationId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $jobPosterApplication;
    }
    
    /**
     * 
     * Returns an array of all JobPosterApplication objects associated with the
     * specified Job Poster.
     * 
     * @param int $jobPosterId
     * @return JobPosterApplication[]
     */
    public static function getJobPosterApplicationsByJobPosterId($jobPosterId) {
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
        SELECT 
            jpa.job_poster_application_id,
            jpa.application_job_poster_id,
            jpa.application_job_seeker_profile_id,
            jpa.job_poster_application_status_id
        FROM job_poster_application jpa
        WHERE
        jpa.application_job_poster_id = :job_poster_id
        ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':job_poster_id', $jobPosterId, PDO::PARAM_INT);
       
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            //$link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'JobPosterApplication');
            $jobPosterApplications = $sql->fetchAll();            
        } catch (PDOException $e) {
            return 'getJobPosterApplicationsByJobPosterId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $jobPosterApplications;
    }
    
    /**
     * Returns an array of all JobPosterApplication objects associated with the
     * specified Job Seeker Profile.
     * 
     * @param int $jobSeekerProfileId
     * @return JobPosterApplication[]
     */
    public static function getJobPosterApplicationsByJobSeekerProfileId($jobSeekerProfileId) {
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
        SELECT 
            jpa.job_poster_application_id,
            jpa.application_job_poster_id,
            jpa.application_job_seeker_profile_id,
            jpa.job_poster_application_status_id
        FROM job_poster_application jpa
        WHERE
        jpa.application_job_seeker_profile_id = :job_seeker_profile_id
        ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':job_seeker_profile_id', $jobSeekerProfileId, PDO::PARAM_INT);
       
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            //$link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'JobPosterApplication');
            $jobPosterApplications = $sql->fetchAll();            
        } catch (PDOException $e) {
            return 'getJobPosterApplicationsByJobSeekerProfileId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $jobPosterApplications;
    }
    
    /**
     * Creates a new JobPosterApplication row in database, returns the 
     * job_poster_application_id of the new row.
     * 
     * @param JobPosterApplication $jobPosterApplication
     * @return int - new job_poster_application_id
     */
    public static function createJobPosterApplication($jobPosterApplication) {
        $link = BaseDAO::getConnection();
        
        $sqlStr = "INSERT INTO job_poster_application
            (application_job_poster_id, application_job_seeker_profile_id, job_poster_application_status_id)
            VALUES
            (:job_poster_id, :job_seeker_profile_id, :job_poster_application_status_id)       
        ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':job_poster_id', $jobPosterApplication->getApplication_job_poster_id(), PDO::PARAM_INT);
        $sql->bindValue(':job_seeker_profile_id', $jobPosterApplication->getApplication_job_seeker_profile_id(), PDO::PARAM_INT);
        $sql->bindValue(':job_poster_application_status_id', $jobPosterApplication->getJob_poster_application_status_id(), PDO::PARAM_INT);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $rowsmodified = $sql->rowCount();
            if($rowsmodified > 0){
                $application_id = $link->lastInsertId();
            }
        } catch (PDOException $e) {
            return 'createJobPosterApplication failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $application_id;
    }
    
    /**
     * Updates JobPosterApplication in database, indexed by 
     * $jobPosterApplication->getJob_poster_application_id().
     * 
     * @param JobPosterApplication $jobPosterApplication
     * @return int $rowsmodified
     */
    public static function updateJobPosterApplication($jobPosterApplication) {
        $link = BaseDAO::getConnection();        
        $sqlStr = "UPDATE job_poster_application SET 
            application_job_poster_id = :job_poster_id, 
            application_job_seeker_profile_id = :job_seeker_profile_id,
            job_poster_application_status_id = :job_poster_application_status_id
            WHERE
            job_poster_application_id = :job_poster_application_id;";
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':job_poster_id', $jobPosterApplication->getApplication_job_poster_id(), PDO::PARAM_INT);
        $sql->bindValue(':job_seeker_profile_id', $jobPosterApplication->getApplication_job_seeker_profile_id(), PDO::PARAM_INT);
        $sql->bindValue(':job_poster_application_status_id', $jobPosterApplication->getJob_poster_application_status_id(), PDO::PARAM_INT);
        $sql->bindValue(':job_poster_application_id', $jobPosterApplication->getJob_poster_application_id(), PDO::PARAM_INT);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $rowsmodified = $sql->rowCount();
        } catch (PDOException $e) {
            return 'createJobPosterApplication failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rowsmodified;
    }
    
    /**
     * 
     * Accepts an array of ApplicationQuestionAnswer objects, and adds them all
     * to database.
     * 
     * @param ApplicationQuestionAnswer[] $applicationQuestionAnswers
     * @return int $rowsmodified - number of rows modified in database
     */
    public static function createApplicationQuestionAnswers($applicationQuestionAnswers) {
        if (sizeof($applicationQuestionAnswers) === 0){
            return 0;
        }
        
        $link = BaseDAO::getConnection();
                
         //Build bulk insert sql strings for array data
        $values = [];
        $valueStrings = [];
        foreach($applicationQuestionAnswers as $questionAnswer) {
            $valueStrings[] = '(?, ?, ?)';
            $entryValues = [$questionAnswer->getJob_poster_application_id(), $questionAnswer->getJob_poster_question_id(), $questionAnswer->getAnswer()];
            $values = array_merge($values, $entryValues);
        }
        
        $sqlStr = "INSERT INTO job_application_answer 
            (job_application_id, job_poster_question_id, answer)
            VALUES " . 
            implode(',', $valueStrings) . ";";
        
        $sql = $link->prepare($sqlStr);
        try {
            $sql->execute($values) or die("ERROR: " . implode(":", $link->errorInfo()));
            $rowsmodified = $sql->rowCount();
        } catch (PDOException $e) {
            return 'createApplicationQuestionAnswers failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rowsmodified;
    }
    
    /**
     * Inserts a single ApplicationQuestionAnswer into the database, or 
     * updates the answer if it already exists for the given Application and Question.
     * 
     * @param ApplicationQuestionAnswer $applicationQuestionAnswer
     */
    public static function putApplicationQuestionAnswer($applicationQuestionAnswer) {       
        $link = BaseDAO::getConnection();
                        
        $sqlStr = "INSERT INTO job_application_answer 
            (job_application_id, job_poster_question_id, answer)
            VALUES
            (:job_application_id, :job_poster_question_id, :answer)
            ON DUPLICATE KEY UPDATE
            answer = :answer_2;               
            ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(":job_application_id", $applicationQuestionAnswer->getJob_poster_application_id(), PDO::PARAM_INT);
        $sql->bindValue(":job_poster_question_id", $applicationQuestionAnswer->getJob_poster_question_id(), PDO::PARAM_INT);
        $sql->bindValue(":answer", $applicationQuestionAnswer->getAnswer(), PDO::PARAM_STR);
        $sql->bindValue(":answer_2", $applicationQuestionAnswer->getAnswer(), PDO::PARAM_STR);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $rowsmodified = $sql->rowCount();
        } catch (PDOException $e) {
            return 'createApplicationQuestionAnswers failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rowsmodified;
    }
    
    /**
     * Returns true if the job application status is 'Draft'
     * 
     * @param type $jobPosterApplicationId
     */
    public static function jobApplicationIsDraft($jobPosterApplicationId) {
        $link = BaseDAO::getConnection();
        $sql_str = "
            SELECT EXISTS (SELECT 1 FROM 
                job_poster_application jpa, application_status ap
            WHERE 
                jpa.job_poster_application_id = :application_id
                AND jpa.job_poster_application_status_id = ap.application_status_id
                AND ap.application_status = 'Draft'
            );
            ";
        $sql = $link->prepare($sql_str);
        $sql->bindValue(':application_id', $jobPosterApplicationId, PDO::PARAM_INT);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $found = $sql->fetch()[0];
        } catch (PDOException $e) {
            return 'jobApplicationIsDraft failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $found == 1;
    }
    
    public static function getJobApplicationCreatorUserId($jobPosterApplicationId) {
        $link = BaseDAO::getConnection();
        $sql_str = "
            SELECT u.user_id
            FROM user u, user_job_seeker_profiles u_jsp, job_poster_application jpa
            WHERE 
                jpa.job_poster_application_id = :application_id
                AND jpa.application_job_seeker_profile_id = u_jsp.job_seeker_profile_id
                AND u.user_id = u_jsp.user_id
            ;";
        $sql = $link->prepare($sql_str);
        $sql->bindValue(':application_id', $jobPosterApplicationId, PDO::PARAM_INT);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $user_id = $sql->fetch()[0];
        } catch (PDOException $e) {
            return 'getJobApplicationCreatorUserId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $user_id;
    }
    
    public static function setJobAppliationStatus($jobPosterApplicationId, $status) {
        $link = BaseDAO::getConnection();
        $sql_str = "
            UPDATE job_poster_application jpa
            SET jpa.job_poster_application_status_id = 
                (SELECT asd.application_status_id 
                FROM application_status_details asd
                WHERE asd.application_status = :status)
            WHERE jpa.job_poster_application_id = :application_id;";
        $sql = $link->prepare($sql_str);
        $sql->bindValue(':application_id', $jobPosterApplicationId, PDO::PARAM_INT);
        $sql->bindValue(':status', $status, PDO::PARAM_STR);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $rowsModified = $sql->rowCount();
        } catch (PDOException $e) {
            return 'setJobAppliationStatus failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rowsModified;
    }
}