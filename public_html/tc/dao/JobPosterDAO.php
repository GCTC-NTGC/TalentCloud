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
            jp.job_poster_open_date_time as open_date,
            jp.job_poster_close_date_time as close_date,
            dd.department_details_name as department,
            pd.province_details_name as location_province,
            cd.city_details_name as location_city,
            jp.job_poster_remuneration_min as remuneration_range_low,
            jp.job_poster_remuneration_max as remuneration_range_high,
            jpd.job_poster_impact as impact
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
        
        //    AND kt.locale_id = l.locale_id,
        //    AND kt.job_poster_id = jp.job_poster_id
        
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':locale_iso', $locale, PDO::PARAM_STR);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sql->setFetchMode( PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'JobPoster',array('id', 'locale_id', 'title', 'description', 'applicants_to_date', 'term_qty', 'term_units', 'job_min_level', 'job_max_level', 'job_start_date', 'open_date', 'close_date', 'department', 'location_province', 'location_city','remuneration_range_low','remuneration_range_high','impact'));
            $rows = $sql->fetchAll();
            //var_dump($rows);
        } catch (PDOException $e) {
            BaseDAO::closeConnection($link);
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
            jp.job_poster_open_date_time as open_date,
            jp.job_poster_close_date_time as close_date,
            dd.department_details_name as department,
            pd.province_details_name as location_province,
            cd.city_details_name as location_city,
            jp.job_poster_remuneration_min as remuneration_range_low,
            jp.job_poster_remuneration_max as remuneration_range_high,
            jpd.job_poster_impact as impact
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
        
        //    AND kt.locale_id = l.locale_id,
        //    AND kt.job_poster_id = jp.job_poster_id
        
        $sql = $link->prepare($sqlStr);
        $sql->bindParam('jobPosterId',$jobPosterId, PDO::PARAM_INT);
        $sql->bindParam(':locale_iso', $locale, PDO::PARAM_STR);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'JobPoster', array('id', 'locale_id', 'title', 'description', 'applicants_to_date', 'term_qty', 'term_units', 'job_min_level', 'job_max_level', 'job_start_date', 'open_date', 'close_date', 'department', 'location_province', 'location_city','remuneration_range_low','remuneration_range_high','impact'));
            $jobPoster = $sql->fetch();
            //var_dump($rows);
        } catch (PDOException $e) {
            BaseDAO::closeConnection($link);
            return 'getJobPostersByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $jobPoster;
    }
    /**
     * 
     * @param type $jobPosterNonLocalized - contains en and fr fields, and 
     *      specifies department, province, etc, by id instead of by name
     * @return type int job_post_id: id of the newly created job post
     */
    public static function createJobPoster($jobPosterNonLocalized){
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
            job_poster_title,
            job_poster_impact
            )
            VALUES
            (@job_post_id,1,'','',:city_en,:title_en, :impact_en),
            (@job_post_id,2,'','',:city_fr,:title_fr, :impact_fr);";
        
        //Build bulk insert sql strings for array data
        $key_task_data = [];
        $key_task_values = [];
        foreach($jobPosterNonLocalized->getKey_tasks_en() as $task) {
            $key_task_values[] = '(@job_post_id, 1, ?)';
            $key_task_data[] = $task;
        }
        foreach($jobPosterNonLocalized->getKey_tasks_fr() as $task) {
            $key_task_values[] = '(@job_post_id, 2, ?)';
            $key_task_data[] = $task;
        }
        $sqlStr4 = "INSERT INTO job_poster_key_task
            (job_poster_id, locale_id, task) VALUES " . 
            implode(',', $key_task_values) . ";";
            
        $core_competency_data = [];
        $core_competency_values = [];
        foreach($jobPosterNonLocalized->getCore_competencies_en() as $core_competency) {
            $core_competency_values[] = '(@job_post_id, 1, ?)';
            $core_competency_data[] = $core_competency;
        }
        foreach($jobPosterNonLocalized->getCore_competencies_fr() as $core_competency) {
            $core_competency_values[] = '(@job_post_id, 2, ?)';
            $core_competency_data[] = $core_competency;
        }
        $sqlStr5 = "INSERT INTO job_poster_core_competency
            (job_poster_id, locale_id, core_competency) VALUES " . 
            implode(',', $core_competency_values) . ";";
        
        $dev_competency_data = [];
        $dev_competency_values = [];
        foreach($jobPosterNonLocalized->getDeveloping_competencies_en() as $dev_competency) {
            $dev_competency_values[] = '(@job_post_id, 1, ?)';
            $dev_competency_data[] = $dev_competency;
        }
        foreach($jobPosterNonLocalized->getDeveloping_competencies_fr() as $dev_competency) {
            $dev_competency_values[] = '(@job_post_id, 2, ?)';
            $dev_competency_data[] = $dev_competency;
        }
        $sqlStr6 = "INSERT INTO job_poster_developing_competency
            (job_poster_id, locale_id, developing_competency) VALUES " . 
            implode(',', $dev_competency_values) . ";";
            
        $requirement_data = [];
        $requirement_values = [];
        foreach($jobPosterNonLocalized->getOther_requirements_en() as $requirement) {
            $requirement_values[] = '(@job_post_id, 1, ?)';
            $requirement_data[] = $requirement;
        }
        foreach($jobPosterNonLocalized->getOther_requirements_fr() as $requirement) {
            $requirement_values[] = '(@job_post_id, 2, ?)';
            $requirement_data[] = $requirement;
        }
        $sqlStr7 = "INSERT INTO job_poster_other_requirement
            (job_poster_id, locale_id, requirement) VALUES " . 
            implode(',', $requirement_values) . ";";
                       
                
        $sql1 = $link->prepare($sqlStr1);
        $sql2 = $link->prepare($sqlStr2);
        $sql3 = $link->prepare($sqlStr3);
        
        if (sizeof($key_task_data) > 0)
            $sql4 = $link->prepare($sqlStr4);
        if (sizeof($core_competency_data) > 0)
            $sql5 = $link->prepare($sqlStr5);
        if (sizeof($dev_competency_data) > 0)
            $sql6 = $link->prepare($sqlStr6);
        if (sizeof($requirement_data) > 0)
            $sql7 = $link->prepare($sqlStr7);
        
        $sql1->bindValue(':term_units_id', $jobPosterNonLocalized->getTerm_units_id(), PDO::PARAM_INT);
        $sql1->bindValue(':term_qty', $jobPosterNonLocalized->getTerm_qty(), PDO::PARAM_INT);
        $sql1->bindValue(':job_min_level_id', $jobPosterNonLocalized->getJob_min_level_id(), PDO::PARAM_INT);
        $sql1->bindValue(':job_max_level_id', $jobPosterNonLocalized->getJob_max_level_id(), PDO::PARAM_INT);
        $sql1->bindValue(':open_date', $jobPosterNonLocalized->getOpen_date(), PDO::PARAM_STR);
        $sql1->bindValue(':close_date', $jobPosterNonLocalized->getClose_date(), PDO::PARAM_STR);
        $sql1->bindValue(':start_date', $jobPosterNonLocalized->getStart_date(), PDO::PARAM_STR);
        $sql1->bindValue(':department_id', $jobPosterNonLocalized->getDepartment_id(), PDO::PARAM_INT);
        $sql1->bindValue(':province_id', $jobPosterNonLocalized->getProvince_id(), PDO::PARAM_INT);
        $sql1->bindValue(':remuneration_range_low', $jobPosterNonLocalized->getRemuneration_range_low(), PDO::PARAM_INT);
        $sql1->bindValue(':remuneration_range_high', $jobPosterNonLocalized->getRemuneration_range_high(), PDO::PARAM_INT);
        
        $sql3->bindValue(':city_en', $jobPosterNonLocalized->getCity_en(), PDO::PARAM_STR);
        $sql3->bindValue(':city_fr', $jobPosterNonLocalized->getCity_fr(), PDO::PARAM_STR);
        $sql3->bindValue(':title_en', $jobPosterNonLocalized->getTitle_en(), PDO::PARAM_STR);
        $sql3->bindValue(':title_fr', $jobPosterNonLocalized->getTitle_fr(), PDO::PARAM_STR);
        $sql3->bindValue(':impact_en', $jobPosterNonLocalized->getImpact_en(), PDO::PARAM_LOB);
        $sql3->bindValue(':impact_fr', $jobPosterNonLocalized->getImpact_fr(), PDO::PARAM_LOB);
       
        $job_post_id = null;
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            $link->beginTransaction();
            $sql1->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $job_post_id = $link->lastInsertId();
            $sql2->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql3->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            
            if (sizeof($key_task_data) > 0)
                 $sql4->execute($key_task_data) or die("ERROR: " . implode(":", $link->errorInfo()));
            if (sizeof($core_competency_data) > 0)
                $sql5->execute($core_competency_data) or die("ERROR: " . implode(":", $link->errorInfo()));
            if (sizeof($dev_competency_data) > 0)
                $sql6->execute($dev_competency_data) or die("ERROR: " . implode(":", $link->errorInfo()));
            if (sizeof($requirement_data) > 0)
                $sql7->execute($requirement_data) or die("ERROR: " . implode(":", $link->errorInfo()));
            
            $link->commit();
        } catch (PDOException $e) {
            BaseDAO::closeConnection($link);
            return 'createJobPoster failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $job_post_id;
    }
}

?>