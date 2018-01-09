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
require_once '../model/JobPoster.php';

/**
 * Summary: Data Access Object for Resources
 * 
 * @extends BaseDAO
 */
class JobPosterDAO extends BaseDAO {

    
    /**
     * 
     * @param type $locale
     * @return type
     */
    public static function getJobPostersByLocale($locale) {

        $link = BaseDAO::getConnection();
        $sqlStr = "
            SELECT jp.job_poster_id as id,
            jpd.job_poster_desc_title as title,
            jpd.job_poster_desc_content as description,
            (SELECT count(*) FROM job_poster_application jpa WHERE jpa.application_job_poster_id = jp.job_poster_id) as applicants_to_date,
            jp.job_poster_term_qty as term_qty,
            jt.job_term as term_units,
            jl_1.job_level as job_min_level,
            jl_2.job_level as job_max_level,
            jp.job_poster_start_date as job_start_date,
            jp.job_poster_end_date as job_end_date,
            jp.job_poster_close_date_time as close_date,
            dd.department_details_name as department,
            pd.province_details_name as location_province,
            cd.city_details_name as location_city
            FROM job_poster jp, job_poster_details jpd, 
                locale l, 
                job_term jt, 
                job_level jl_1, 
                job_level jl_2, 
                department d, 
                department_details dd,
                province p,
                province_details pd,
                city c,
                city_details cd
            WHERE jpd.job_poster_id = jp.job_poster_id
            AND l.locale_iso = :locale_iso
            AND jpd.locale_id = l.locale_id
            AND jt.job_term_id = jp.job_term_id
            AND jl_1.job_level_id = jp.job_poster_job_min_level_id
            AND jl_2.job_level_id = jp.job_poster_job_max_level_id
            AND d.department_id = jp.job_poster_department_id
            AND dd.department_id = d.department_id
            AND dd.department_details_locale_id = l.locale_id
            AND jp.job_poster_department_id = d.department_id
            AND pd.province_details_locale_id = l.locale_id
            AND pd.province_details_province_id = p.province_id
            AND p.province_id = d.department_province_id
            AND cd.city_details_city_id = c.city_id
            AND d.department_city_id = c.city_id
            AND cd.city_details_locale_id = l.locale_id
            ";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':locale_iso', $locale, PDO::PARAM_STR);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sql->setFetchMode( PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'JobPoster',array('id', 'title', 'description', 'applicants_to_date', 'term_qty', 'term_units', 'job_min_level', 'job_max_level', 'job_start_date', 'job_end_date', 'close_date', 'department', 'location_province', 'location_city','','',''));
            $rows = $sql->fetchAll();
            //var_dump($rows);
        } catch (PDOException $e) {
            return 'getJobPostersByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rows;
    }

    /**
     * 
     * @param type $locale
     * @param type $jobPosterId
     * @return type
     */
    public static function getJobPosterById($locale, $jobPosterId) {

        $link = BaseDAO::getConnection();
        $sqlStr = "
            SELECT jp.job_poster_id as id,
            jpd.job_poster_desc_title as title,
            jpd.job_poster_desc_content as description,
            (SELECT count(*) FROM job_poster_application jpa WHERE jpa.application_job_poster_id = jp.job_poster_id) as applicants_to_date,
            jp.job_poster_term_qty as term_qty,
            jt.job_term as term_units,
            jl_1.job_level as job_min_level,
            jl_2.job_level as job_max_level,
            jp.job_poster_start_date as job_start_date,
            jp.job_poster_end_date as job_end_date,
            jp.job_poster_close_date_time as close_date,
            dd.department_details_name as department,
            pd.province_details_name as location_province,
            cd.city_details_name as location_city
            FROM job_poster jp, 
                job_poster_details jpd, 
                locale l, 
                job_term jt, 
                job_level jl_1, 
                job_level jl_2, 
                department d, 
                department_details dd,
                province p,
                province_details pd,
                city c,
                city_details cd
            WHERE jp.job_poster_id = :jobPosterId
            AND jpd.job_poster_id = jp.job_poster_id
            AND l.locale_iso = :locale_iso
            AND jpd.locale_id = l.locale_id
            AND jt.job_term_id = jp.job_term_id
            AND jl_1.job_level_id = jp.job_poster_job_min_level_id
            AND jl_2.job_level_id = jp.job_poster_job_max_level_id
            AND d.department_id = jp.job_poster_department_id
            AND dd.department_id = d.department_id
            AND dd.department_details_locale_id = l.locale_id
            AND jp.job_poster_department_id = d.department_id
            AND pd.province_details_locale_id = l.locale_id
            AND pd.province_details_province_id = p.province_id
            AND p.province_id = d.department_province_id
            AND cd.city_details_city_id = c.city_id
            AND d.department_city_id = c.city_id
            AND cd.city_details_locale_id = l.locale_id
            ";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam('jobPosterId',$jobPosterId, PDO::PARAM_INT);
        $sql->bindParam(':locale_iso', $locale, PDO::PARAM_STR);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'JobPoster', array('id', 'title', 'description', 'applicants_to_date', 'term_qty', 'term_units', 'job_min_level', 'job_max_level', 'job_start_date', 'job_end_date', 'close_date', 'department', 'location_province', 'location_city','','',''));
            $jobPoster = $sql->fetch();
            //var_dump($rows);
        } catch (PDOException $e) {
            return 'getJobPostersByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $jobPoster;
    }
    
    public static function createJobPoster($jobPoster){
        /*
         * BEGIN;
            INSERT INTO job_poster
            (
            job_term_id,
            job_poster_term_qty,
            job_poster_job_min_level_id,
            job_poster_job_max_level_id,
            job_poster_start_date,
            job_poster_end_date,
            job_poster_close_date_time,
            job_poster_department_id
            )
            VALUES
            (
            0000000003,
            2,
            0000000001,
            0000000003,
            '2018-02-01 08:00:00',
            '2020-02-01 17:00:00',
            '2018-01-01 23:59:59',
            0000000001
            );
            INSERT INTO job_poster_details
            (
            job_poster_id,
            locale_id,
            job_poster_desc_title,
            job_poster_desc_content
            )
            VALUES
            (
            last_insert_id(),
            0000000002,
            'Designer UX',
            'This is the description for the UX Design position_french'
            );
            COMMIT;

         */
    }
    
}

?>