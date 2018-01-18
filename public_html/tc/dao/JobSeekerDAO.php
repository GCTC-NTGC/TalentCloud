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
require_once '../model/JobSeekerProfile.php';

/**
 * Summary: Data Access Object for Resources
 * 
 * @extends BaseDAO
 */
class JobSeekerDAO extends BaseDAO {

    
    /**
     * 
     * @param type $user_id
     * @return type array of JobSeekerProfiles
     */
    public static function getJobSeekerProfileByUserId($user_id) {

        $link = BaseDAO::getConnection();
        $sqlStr = "
            SELECT jsp.job_seeker_profile_id,
                jsp.job_seeker_profile_link,
                jsp.job_seeker_profile_accomp,
                jsp.job_seeker_profile_best_exp,
                jsp.job_seeker_profile_worst_exp,
                jsp.job_seeker_profile_superpower,
                jsp.last_updated as last_updated
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
            $sql->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'JobSeekerProfile',array('job_seeker_profile_id','job_seeker_profile_link','job_seeker_profile_accomp','job_seeker_profile_best_exp','job_seeker_profile_worst_exp','job_seeker_profile_superpower','last_updated'));
            $rows = $sql->fetchAll();
            //var_dump($rows);
        } catch (PDOException $e) {
            return 'getJobSeekersByUserId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rows;
    }
    
    public static function addJobSeekerProfile($jobSeekerProfile,$user_id){
        
        $user_id_int = intval($user_id);
        $jobSeekerProfile_link = $jobSeekerProfile->getJob_seeker_profile_link();
        $jobSeekerProfile_profile_accomp = $jobSeekerProfile->getJob_seeker_profile_accomp();
        $jobSeekerProfile_profile_best_exp = $jobSeekerProfile->getJob_seeker_profile_best_exp();
        $jobSeekerProfile_profile_worst_exp = $jobSeekerProfile->getJob_seeker_profile_worst_exp();
        $jobSeekerProfile_profile_superpower = $jobSeekerProfile->getJob_seeker_profile_superpower();
        
        
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
            
                INSERT INTO job_seeker_profile
                (job_seeker_profile_link,
                job_seeker_profile_accomp,
                job_seeker_profile_best_exp,
                job_seeker_profile_worst_exp,
                job_seeker_profile_superpower,
                last_updated)
                VALUES
                (
                :job_seeker_profile_link,
                :job_seeker_profile_accomp,
                :job_seeker_profile_best_exp,
                :job_seeker_profile_worst_exp,
                :job_seeker_profile_superpower,
                now()
                );
            ";
        
        $sqlStr2 = "
                INSERT INTO user_job_seeker_profiles
                (
                user_id,
                job_seeker_profile_id
                )
                VALUES
                (
                :user_id,
                last_insert_id()
                );

            ";
        $sql = $link->prepare($sqlStr);
        $sql2 = $link->prepare($sqlStr2);
        //$sql->bindParam(':job_seeker_profile_id', $jobSeekerProfile_id, PDO::PARAM_INT);
        $sql->bindParam(':job_seeker_profile_link', $jobSeekerProfile_link, PDO::PARAM_STR);
        $sql->bindParam(':job_seeker_profile_accomp', $jobSeekerProfile_profile_accomp, PDO::PARAM_STR);
        $sql->bindParam(':job_seeker_profile_best_exp', $jobSeekerProfile_profile_best_exp, PDO::PARAM_STR);
        $sql->bindParam(':job_seeker_profile_worst_exp', $jobSeekerProfile_profile_worst_exp, PDO::PARAM_STR);
        $sql->bindParam(':job_seeker_profile_superpower', $jobSeekerProfile_profile_superpower, PDO::PARAM_STR);
        $sql2->bindParam(':user_id', $user_id_int, PDO::PARAM_INT);

        $rowsmodified = 0;
        
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            $link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sql2->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $link->commit();
            $rowsmodified = $sql->rowCount();
            //$sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            //$sql->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'JobSeekerProfile',array('job_seeker_profile_id','job_seeker_profile_link','job_seeker_profile_accomp','job_seeker_profile_best_exp','job_seeker_profile_worst_exp','job_seeker_profile_superpower','last_updated'));
            //$rows = $sql->fetchAll();
            //var_dump($rows);
            //$result->
            //var_dump($result);
            if($rowsmodified > 0){
                $insert_id = $link->lastInsertId();
            }
        } catch (PDOException $e) {
            return 'getJobSeekersByUserId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $insert_id;
    }
    
    
    /**
     * 
     * @param type $user_id
     * @return type array of JobSeekerProfiles
     */
    public static function getJobSeekers() {

        $link = BaseDAO::getConnection();
                
        $sqlStr = "
            SELECT u.firstname,
                    u.lastname,
                    jsp.job_seeker_profile_id,
                    jsp.job_seeker_profile_link,
                    jsp.job_seeker_profile_accomp,
                    jsp.job_seeker_profile_best_exp,
                    jsp.job_seeker_profile_worst_exp,
                    jsp.job_seeker_profile_superpower,
                    max(jsp.last_updated) as last_updated
            FROM job_seeker_profile jsp, user u, user_job_seeker_profiles ujsp
            WHERE ujsp.user_id = u.user_id
            AND jsp.job_seeker_profile_id = ujsp.job_seeker_profile_id
            GROUP BY u.user_id
            ";
        
        $sql = $link->prepare($sqlStr);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            //$sql->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'JobSeekerProfile',array('job_seeker_profile_id','job_seeker_profile_link','job_seeker_profile_accomp','job_seeker_profile_best_exp','job_seeker_profile_worst_exp','job_seeker_profile_superpower','last_updated'));
            $sql->setFetchMode(PDO::FETCH_ASSOC);
            $rows = $sql->fetchAll();
            //var_dump($rows);
        } catch (PDOException $e) {
            return 'getJobSeekersByUserId failed: ' . $e->getMessage();
        }
        
        BaseDAO::closeConnection($link);
        return $rows;
    }
}

?>