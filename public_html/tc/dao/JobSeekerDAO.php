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
require_once __DIR__ . '/../model/JobSeekerProfile.php';

/**
 * Summary: Data Access Object for Resources
 * 
 * @extends BaseDAO
 */
class JobSeekerDAO extends BaseDAO {

    public static function getJobSeekerProfileById($job_seeker_profile_id) {
        $link = BaseDAO::getConnection();
        $sqlStr = "
            SELECT 
                jsp.job_seeker_profile_id,
                u.name as job_seeker_profile_name,
                u.email as job_seeker_profile_email,
                jsp.job_seeker_profile_link,
                jsp.job_seeker_profile_tagline,
                jsp.job_seeker_profile_twitter_link,
                jsp.job_seeker_profile_linkedin_link,
                jsp.last_updated as last_updated,
                u.user_id
            FROM job_seeker_profile jsp, user u, user_job_seeker_profiles ujsp
            WHERE ujsp.user_id = u.user_id
            AND jsp.job_seeker_profile_id = ujsp.job_seeker_profile_id
            AND jsp.job_seeker_profile_id = :job_seeker_profile_id
            ";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':job_seeker_profile_id', $job_seeker_profile_id, PDO::PARAM_INT);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'JobSeekerProfile');
            $profile = $sql->fetch();
            //var_dump($rows);
        } catch (PDOException $e) {
            return 'getJobSeekerProfileById failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $profile;
    }
    
    /**
     * 
     * @param int $user_id
     * @return JobSeekerProfile
     */
    public static function getJobSeekerProfileByUserId($user_id) {

        $link = BaseDAO::getConnection();
        $sqlStr = "
            SELECT 
                jsp.job_seeker_profile_id,
                u.name as job_seeker_profile_name,
                u.email as job_seeker_profile_email,
                jsp.job_seeker_profile_link,
                jsp.job_seeker_profile_tagline,
                jsp.job_seeker_profile_twitter_link,
                jsp.job_seeker_profile_linkedin_link,
                jsp.last_updated as last_updated,
                u.user_id
            FROM job_seeker_profile jsp, user u, user_job_seeker_profiles ujsp
            WHERE u.user_id = :user_id
            AND ujsp.user_id = u.user_id
            AND jsp.job_seeker_profile_id = ujsp.job_seeker_profile_id
            ORDER BY jsp.last_updated DESC LIMIT 1
            ";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':user_id', $user_id, PDO::PARAM_STR);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'JobSeekerProfile');
            $rows = $sql->fetch();
            //var_dump($rows);
        } catch (PDOException $e) {
            return 'getJobSeekersByUserId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rows;
    }
    
    /**
     * 
     * @param int $jobSeekerProfileId
     * @return JobSeekerProfileAnswer[]
     */
    public static function getJobSeekerProfileAnswers($jobSeekerProfileId) {
        $link = BaseDAO::getConnection();
        $sqlStr = "
            SELECT 
                a.job_seeker_profile_question_id,
                a.answer
            FROM job_seeker_profile_answer a
            WHERE a.job_seeker_profile_id = :job_seeker_profile_id
            ORDER BY a.job_seeker_profile_question_id ASC
            ";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':job_seeker_profile_id', $jobSeekerProfileId, PDO::PARAM_INT);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'JobSeekerProfileAnswer');
            $rows = $sql->fetchAll();
            //var_dump($rows);
        } catch (PDOException $e) {
            return 'getJobSeekerProfileAnswers failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rows;
    }
    
    /**
     * 
     * @param JobSeekerProfile $jobSeekerProfile
     * @param int $user_id
     * @return int job_seeker_profile_id
     */
    public static function addJobSeekerProfile($jobSeekerProfile, $user_id) {
        
        $user_id_int = intval($user_id);
        $jobSeekerProfile_link = $jobSeekerProfile->getJob_seeker_profile_link();
        $jobSeekerProfile_tagline = $jobSeekerProfile->getJob_seeker_profile_tagline();
        $jobSeekerProfile_twitter_link = $jobSeekerProfile->getJob_seeker_profile_twitter_link();
        $jobSeekerProfile_linkedin_link = $jobSeekerProfile->getJob_seeker_profile_linkedin_link();
        
        $link = BaseDAO::getConnection();
        
        $sqlStr = "                
                INSERT INTO job_seeker_profile
                (job_seeker_profile_link,
                job_seeker_profile_tagline,
                job_seeker_profile_twitter_link,
                job_seeker_profile_linkedin_link,
                last_updated)
                VALUES
                (
                :job_seeker_profile_link,
                :job_seeker_profile_tagline,
                :job_seeker_profile_twitter_link,
                :job_seeker_profile_linkedin_link,
                now()
                );
            ";
        $sqlStr_id = "SELECT LAST_INSERT_ID() INTO @job_seeker_profile_id;";
        $sqlStr_user2profile = "
                INSERT INTO user_job_seeker_profiles
                (
                user_id,
                job_seeker_profile_id
                )
                VALUES
                (
                :user_id,
                @job_seeker_profile_id
                );
            ";
        $answer_value_strings = [];
        $answer_data = [];
        foreach ($jobSeekerProfile->getJob_seeker_profile_answers() as $answer) {
            $answer_value_strings[] = '(@job_seeker_profile_id, ?, ?)';
            $answer_data[] = $answer->getJob_seeker_profile_question_id();
            $answer_data[] = $answer->getAnswer();
        }
        $sqlStr_answers = "INSERT INTO job_seeker_profile_answer
            (job_seeker_profile_id, job_seeker_profile_question_id, answer) VALUES " . 
            implode(',', $answer_value_strings) . ";";
        
        $sql = $link->prepare($sqlStr);
        $sql_id = $link->prepare($sqlStr_id);
        $sql_user2profile = $link->prepare($sqlStr_user2profile);
        //$sql->bindParam(':job_seeker_profile_id', $jobSeekerProfile_id, PDO::PARAM_INT);
        $sql->bindParam(':job_seeker_profile_link', $jobSeekerProfile_link, PDO::PARAM_STR);
        $sql->bindParam(':job_seeker_profile_tagline', $jobSeekerProfile_tagline, PDO::PARAM_STR);
        $sql->bindParam(':job_seeker_profile_twitter_link', $jobSeekerProfile_twitter_link, PDO::PARAM_STR);
        $sql->bindParam(':job_seeker_profile_linkedin_link', $jobSeekerProfile_linkedin_link, PDO::PARAM_STR);
        $sql_user2profile->bindParam(':user_id', $user_id_int, PDO::PARAM_INT);
        if (sizeof($answer_data) > 0) {
            $sql_answers = $link->prepare($sqlStr_answers);
        }
        
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            $link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $job_seeker_profile_id = $link->lastInsertId();
            $sql_id->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql_user2profile->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            if (sizeof($answer_data) > 0) {
                $sql_answers->execute($answer_data) or die("ERROR: " . implode(":", $link->errorInfo()));
            }
            $link->commit(); 
            
        } catch (PDOException $e) {
            return 'addJobSeekerProfile failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $job_seeker_profile_id;
    }
    
    
    /**
     * 
     * @return JobSeekerProfile[]
     */
    public static function getJobSeekers() {

        $link = BaseDAO::getConnection();
                
        $sqlStr = "
            SELECT  
                    jsp.job_seeker_profile_id,
                    u.name as job_seeker_profile_name,
                    u.email as job_seeker_profile_email,
                    jsp.job_seeker_profile_link,
                    jsp.job_seeker_profile_tagline,
                    jsp.job_seeker_profile_twitter_link,
                    jsp.job_seeker_profile_linkedin_link,
                    jsp.last_updated,
                    u.user_id
            FROM job_seeker_profile jsp, user u, user_job_seeker_profiles ujsp
            WHERE ujsp.user_id = u.user_id
            AND jsp.job_seeker_profile_id = ujsp.job_seeker_profile_id
            AND jsp.job_seeker_profile_id IN (
                SELECT MAX(jsp.job_seeker_profile_id) 
                FROM job_seeker_profile jsp, user_job_seeker_profiles ujsp
                WHERE jsp.job_seeker_profile_id = ujsp.job_seeker_profile_id
                GROUP BY ujsp.user_id
            );
            ";
        /*
        AND d.skill_declaration_id IN (
                    SELECT MAX(skill_declaration_id)
                    FROM skill_declaration
                    WHERE job_poster_application_id = :job_poster_application_id_2
                    GROUP BY criteria_id
                );
        */
        $sql = $link->prepare($sqlStr);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'JobSeekerProfile');
            $rows = $sql->fetchAll();
        } catch (PDOException $e) {
            return 'getJobSeekers failed: ' . $e->getMessage();
        }
        
        BaseDAO::closeConnection($link);
        return $rows;
    }
}