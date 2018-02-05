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
require_once '../model/JobPosterNonLocalized.php';

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
            l.locale_id as locale_id,
            jpd.job_poster_desc_title as title,
            jpd.job_poster_desc_content as description,
            (SELECT count(*) FROM job_poster_application jpa WHERE jpa.application_job_poster_id = jp.job_poster_id) as applicants_to_date,
            jp.job_poster_term_qty as term_qty,
            jtd.job_term as term_units,
            jl_1.job_level as job_min_level,
            jl_2.job_level as job_max_level,
            jp.job_poster_start_date as job_start_date,
            jp.job_poster_end_date as job_end_date,
            jp.job_poster_close_date_time as close_date,
            dd.department_details_name as department,
            pd.province_details_name as location_province,
            cd.city_details_name as location_city,
            jp.job_poster_remuneration_min as remuneration_range_low,
            jp.job_poster_remuneration_max as remuneration_range_high
            FROM job_poster jp, job_poster_details jpd, 
                locale l, 
                job_term_details jtd, 
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
            AND jtd.job_term_id = jp.job_term_id
            AND jtd.job_term_locale_id = l.locale_id
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
            $sql->setFetchMode( PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'JobPoster',array('id', 'locale_id', 'title', 'description', 'applicants_to_date', 'term_qty', 'term_units', 'job_min_level', 'job_max_level', 'job_start_date', 'job_end_date', 'close_date', 'department', 'location_province', 'location_city','remuneration_range_low','remuneration_range_high'));
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
            l.locale_id as locale_id,
            jpd.job_poster_desc_title as title,
            jpd.job_poster_desc_content as description,
            (SELECT count(*) FROM job_poster_application jpa WHERE jpa.application_job_poster_id = jp.job_poster_id) as applicants_to_date,
            jp.job_poster_term_qty as term_qty,
            jtd.job_term as term_units,
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
                job_term_details jtd,
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
            AND jtd.job_term_id = jp.job_term_id
            AND jtd.job_term_locale_id = l.locale_id
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
        $link = BaseDAO::getConnection();
        $sqlStr1 = "
            INSERT INTO job_poster
            (
            job_term_id,
            job_poster_term_qty,
            job_poster_job_min_level_id,
            job_poster_job_max_level_id,
            job_poster_open_date_time,
            job_poster_close_date_time,
            job_poster_start_date,
            job_poster_department_id,
            job_poster_province_id,
            job_poster_remuneration_min,
            job_poster_remuneration_max
            )
            VALUES
            (
            :term_units_id,
            :term_qty,
            :job_min_level_id,
            :job_max_level_id,
            :open_date,
            :close_date,
            :start_date,
            :department_id,
            :province_id,
            :remuneration_range_low,
            :remuneration_range_high
            );";
        $sqlStr2 = "SELECT LAST_INSERT_ID() INTO @job_post_id;";
        
        $sqlStr3 = "
            INSERT INTO job_poster_details
            (
            job_poster_id,
            locale_id,
            job_poster_desc_title,
            job_poster_desc_content,
            job_poster_city,
            job_poster_title
            )
            VALUES
            (@job_post_id,1,'','',:city_en,:title_en),
            (@job_post_id,2,'','',:city_fr,:title_fr);";
        
        $sql1 = $link->prepare($sqlStr1);
        $sql2 = $link->prepare($sqlStr2);
        $sql3 = $link->prepare($sqlStr3);
        
        $sql1->bindValue(':term_units_id', $jobPoster->getTerm_units_id(), PDO::PARAM_INT);
        $sql1->bindValue(':term_qty', $jobPoster->getTerm_qty(), PDO::PARAM_INT);
        $sql1->bindValue(':job_min_level_id', $jobPoster->getJob_min_level_id(), PDO::PARAM_INT);
        $sql1->bindValue(':job_max_level_id', $jobPoster->getJob_max_level_id(), PDO::PARAM_INT);
        $sql1->bindValue(':open_date', $jobPoster->getOpen_date(), PDO::PARAM_STR);
        $sql1->bindValue(':close_date', $jobPoster->getClose_date(), PDO::PARAM_STR);
        $sql1->bindValue(':start_date', $jobPoster->getStart_date(), PDO::PARAM_STR);
        $sql1->bindValue(':department_id', $jobPoster->getDepartment_id(), PDO::PARAM_INT);
        $sql1->bindValue(':province_id', $jobPoster->getProvince_id(), PDO::PARAM_INT);
        $sql1->bindValue(':remuneration_range_low', $jobPoster->getRemuneration_range_low(), PDO::PARAM_INT);
        $sql1->bindValue(':remuneration_range_high', $jobPoster->getRemuneration_range_high(), PDO::PARAM_INT);
        
        $sql3->bindValue(':city_en', $jobPoster->getCity_en(), PDO::PARAM_STR);
        $sql3->bindValue(':city_fr', $jobPoster->getCity_fr(), PDO::PARAM_STR);
        $sql3->bindValue(':title_en', $jobPoster->getTitle_en(), PDO::PARAM_STR);
        $sql3->bindValue(':title_fr', $jobPoster->getTitle_fr(), PDO::PARAM_STR);
       
        $job_post_id = null;
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            $link->beginTransaction();
            $sql1->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $job_post_id = $link->lastInsertId();
            $sql2->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql3->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $link->commit();
        } catch (PDOException $e) {
            return 'createJobPoster failed: ' . $e->getMessage();
        }
        return $job_post_id;
    }
}

?>