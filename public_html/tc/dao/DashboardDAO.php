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

    public static function getDashboardByUserId($user_id, $locale_iso){
        
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
            SELECT 
                ujsp.user_id,
                jpd.job_poster_id, 
                jpd.job_poster_title,
                jpmuid.user_id as manager_user_id,
                asd.application_status, 
                jp.job_poster_close_date_time,
                dd.department_details_name
            FROM 
				user_job_seeker_profiles ujsp, 
				user u, 
				job_seeker_profile jsp, 
				job_poster_application jpa,
                application_status aps,
                application_status_details asd,
                job_poster jp,
                job_poster_details jpd,
                job_poster_to_manager_user_id jpmuid,
                locale l,
                department d,
                department_details dd
            WHERE ujsp.user_id = :user_id
            AND l.locale_iso = :locale_iso
            AND ujsp.user_id = u.user_id
            AND jsp.job_seeker_profile_id = ujsp.job_seeker_profile_id
            AND jpa.application_job_seeker_profile_id = ujsp.job_seeker_profile_id
            AND jpa.job_poster_application_status_id = aps.application_status_id
            AND jp.job_poster_id = jpa.application_job_poster_id
            AND jpd.job_poster_id = jp.job_poster_id
            AND jpd.locale_id = l.locale_id
            AND asd.application_status_locale_id = l.locale_id
            AND asd.application_status_id = aps.application_status_id
            AND jp.job_poster_department_id = d.department_id
            AND dd.department_id = d.department_id
            AND dd.department_details_locale_id = l.locale_id
            AND jpmuid.job_poster_id = jpd.job_poster_id;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $sql->bindParam(':locale_iso', $locale_iso, PDO::PARAM_INT);

        //var_dump($sql);
            
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