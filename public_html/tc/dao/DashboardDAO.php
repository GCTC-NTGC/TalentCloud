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
class DashboardDAO extends BaseDAO {

    public static function getDashboardByUserId($user_id, $locale_id){
        
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
            SELECT jpd.job_poster_id, jpd.job_poster_title, jp.job_poster_close_date_time
            FROM 
            job_poster_application jpa,
            job_seeker_profile jsp,
            user_job_seeker_profiles ujsp,
            job_poster jp,
            job_poster_details jpd,
            job_poster_to_manager_user_id jpm,
            user_manager_profile ump,
            user u,
            locale l
            WHERE u.user_id = 1
            AND l.locale_id = 1
            AND ujsp.user_id = u.user_id
            AND jsp.job_seeker_profile_id = ujsp.job_seeker_profile_id
            AND jpa.application_job_seeker_profile_id = jsp.job_seeker_profile_id
            AND jp.job_poster_id = jpa.application_job_poster_id
            AND jpd.job_poster_id = jp.job_poster_id
            AND jpd.locale_id = l.locale_id
            AND ump.user_id = jpm.user_id
            AND jp.job_poster_id = jpm.job_poster_id;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $sql->bindParam(':locale_id', $locale_id, PDO::PARAM_INT);

        $job_poster_application_id;
        
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            //$link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_ASSOC);
            $result = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getJobSeekersByUserId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $result;
    }
    
}

?>