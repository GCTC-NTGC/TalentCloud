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
require_once '../model/JobPosterQuestion.php';
require_once '../model/JobPosterNonLocalized.php';
require_once '../model/Lookup.php';

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
            jp_to_user.user_id as manager_user_id,
            jpd.job_poster_title as title,
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
            jpd.branch as branch,
            jpd.division as division,
            pd.province_details_name as location_province,
            cd.city_details_name as location_city,
            jp.job_poster_remuneration_min as remuneration_range_low,
            jp.job_poster_remuneration_max as remuneration_range_high,
            jpd.job_poster_impact as impact
            FROM job_poster jp, job_poster_details jpd, 
                locale l, 
                job_poster_to_manager_user_id jp_to_user,
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
            AND jp_to_user.job_poster_id = jp.job_poster_id
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
            $sql->setFetchMode( PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'JobPoster',array('id', 'locale_id', 'manager_user_id', 'title', 'description', 'applicants_to_date', 'term_qty', 'term_units', 'job_min_level', 'job_max_level', 'job_start_date', 'open_date', 'close_date', 'department', 'branch', 'division', 'location_province', 'location_city','remuneration_range_low','remuneration_range_high','impact','key_tasks','core_competencies','dev_competencies','other_qualifications'));
            $jobPosters = $sql->fetchAll();
            //var_dump($rows);
        } catch (PDOException $e) {
            BaseDAO::closeConnection($link);
            return 'getJobPostersByLocale failed: ' . $e->getMessage();
        }
        foreach ($jobPosters as $jobPoster) {
            self::fetchArrayItemsForJobPoster($jobPoster, $locale);
        }
        
        return $jobPosters;
    }

    /**
     * 
     * @param type $locale
     * @param type $jobPosterId
     * @return type
     */
    public static function getJobPosterById($locale, $jobPosterId) {

        $link = BaseDAO::getConnection();
        
        //$sqlIdConstStr = "SELECT :jobPosterId INTO @job_poster_id;";
        //$sqlLocaleConstStr = "SELECT :local_iso INTO @local_iso;";
        
        $sqlStr = "
            SELECT jp.job_poster_id as id,
            l.locale_id as locale_id,
            jp_to_user.user_id as manager_user_id,
            jpd.job_poster_title as title,
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
            jpd.branch as branch,
            jpd.division as division,
            pd.province_details_name as location_province,
            cd.city_details_name as location_city,
            jp.job_poster_remuneration_min as remuneration_range_low,
            jp.job_poster_remuneration_max as remuneration_range_high,
            jpd.job_poster_impact as impact
            FROM job_poster jp, 
                job_poster_details jpd, 
                locale l,
                job_poster_to_manager_user_id jp_to_user,
                job_term_details jtd,
                job_level jl_1, 
                job_level jl_2, 
                department d, 
                department_details dd,
                province p,
                province_details pd,
                city c,
                city_details cd                
            WHERE jp.job_poster_id = :job_poster_id
            AND jpd.job_poster_id = jp.job_poster_id
            AND l.locale_iso = :locale_iso
            AND jpd.locale_id = l.locale_id
            AND jp_to_user.job_poster_id = jp.job_poster_id
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
                
        $input_fields = array(':job_poster_id' => $jobPosterId, ':locale_iso' => $locale);
        
        try {
            //$sqlIdConst->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            //$sqlLocaleConst->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
                    
            $sql->execute($input_fields) or die("ERROR: " . implode(":", $conn->errorInfo()));
            
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'JobPoster', array('id', 'locale_id', 'manager_user_id', 'title', 'description', 'applicants_to_date', 'term_qty', 'term_units', 'job_min_level', 'job_max_level', 'job_start_date', 'open_date', 'close_date', 'department', 'branch', 'division', 'location_province', 'location_city','remuneration_range_low','remuneration_range_high','impact'));
            $jobPoster = $sql->fetch();            
        } catch (PDOException $e) {
            BaseDAO::closeConnection($link);
            return 'getJobPostersById failed: ' . $e->getMessage();
        }
        self::fetchArrayItemsForJobPoster($jobPoster, $locale);
        return $jobPoster;
    }
    
    /**
     * 
     * @param JobPoster $jobPoster - a job poster with all non-array fields already set
     * @param string $locale - 'en_CA' or 'fr_CA'
     * 
     * Modifies $jobPoster, setting the following fields appropriately:
     *  key_tasks, core_competencies, developing_competencies, other_requirements
     * 
     * @return JobPoster $jobPoster - the same object as the input parameter, with array fields set
     */
    private static function fetchArrayItemsForJobPoster($jobPoster, $locale) {
        $sqlTasksStr = "
            SELECT key_tasks.task
            FROM job_poster_key_task as key_tasks, locale
            WHERE key_tasks.job_poster_id = :job_poster_id 
            AND locale.locale_iso = :locale_iso
            AND locale.locale_id = key_tasks.locale_id
            ;";
                
        $sqlCoreCompsStr = "
            SELECT 
                criteria.criteria_id as id,
                criteria.criteria_name as value
            FROM criteria, locale, criteria_type
            WHERE criteria.job_poster_id = :job_poster_id 
            AND locale.locale_iso = :locale_iso
            AND locale.locale_id = criteria.locale_id
            AND criteria.criteria_type_id = criteria_type.criteria_type_id
            AND criteria_type.criteria_type = 'essential'
            ;";
                
        $sqlDevelopingCompsStr = "
            SELECT 
                criteria.criteria_id as id,
                criteria.criteria_name as value
            FROM criteria, locale, criteria_type
            WHERE criteria.job_poster_id = :job_poster_id 
            AND locale.locale_iso = :locale_iso
            AND locale.locale_id = criteria.locale_id
            AND criteria.criteria_type_id = criteria_type.criteria_type_id
            AND criteria_type.criteria_type = 'asset'
            ;";
        
        $sqlRequirementsStr = "
            SELECT 
                criteria.criteria_id as id,
                criteria.criteria_name as value
            FROM criteria, locale, criteria_type
            WHERE criteria.job_poster_id = :job_poster_id 
            AND locale.locale_iso = :locale_iso
            AND locale.locale_id = criteria.locale_id
            AND criteria.criteria_type_id = criteria_type.criteria_type_id
            AND criteria_type.criteria_type = 'other'
            ;";
        
        $sqlQuestionsStr = "
            SELECT 
                question.id as id, question.question as question
            FROM 
                job_poster_question as question, locale
            WHERE 
                question.job_poster_id = :job_poster_id
                AND locale.locale_iso = :locale_iso
                AND locale.locale_id = question.locale_id
            ;";
        
        $link = BaseDAO::getConnection();
        $sqlTasks = $link->prepare($sqlTasksStr);
        $sqlCoreComps = $link->prepare($sqlCoreCompsStr);
        $sqlDevelopingComps = $link->prepare($sqlDevelopingCompsStr);
        $sqlRequirements = $link->prepare($sqlRequirementsStr);
        $sqlQuestions = $link->prepare($sqlQuestionsStr);
        
        $input_fields = array(':job_poster_id' => $jobPoster->getId(), ':locale_iso' => $locale);
        
        try {
            
            $sqlTasks->execute($input_fields) or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sqlCoreComps->execute($input_fields) or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sqlDevelopingComps->execute($input_fields) or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sqlRequirements->execute($input_fields) or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sqlQuestions->execute($input_fields) or die("ERROR: " . implode(":", $conn->errorInfo()));
            
            $sqlTasks->setFetchMode(PDO::FETCH_NUM);
            $sqlCoreComps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'Lookup');
            $sqlDevelopingComps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'Lookup');
            $sqlRequirements->setFetchMode(PDO::FETCH_NUM);
            $sqlQuestions->setFetchMode( PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'JobPosterQuestion');
            
            //fetch array items
            $tasks = $sqlTasks->fetchAll();
            $core_comps = $sqlCoreComps->fetchAll();
            $developing_comps = $sqlDevelopingComps->fetchAll();
            $other_requirements = $sqlRequirements->fetchAll();
            $questions = $sqlQuestions->fetchAll();
            
            //merge arrays or make them empty arrays (instead of null)
            $tasks = empty($tasks) ? [] : array_merge(...$tasks);
            $other_requirements = empty($other_requirements) ? [] : array_merge(...$other_requirements);
            
            $jobPoster->setKey_tasks($tasks);
            $jobPoster->setCore_competencies($core_comps);
            $jobPoster->setDeveloping_competencies($developing_comps);
            $jobPoster->setOther_requirements($other_requirements);
            $jobPoster->setQuestions($questions);
            
        } catch (PDOException $e) {
            BaseDAO::closeConnection($link);
            return 'fetchArrayItemsForJobPoster failed: ' . $e->getMessage();
        }
        return $jobPoster;
    }
    /**
     * 
     * @param JobPosterNonLocalized $jobPosterNonLocalized - contains en and fr fields, and 
     *      specifies department, province, etc, by id instead of by name
     * @return int job_post_id: id of the newly created job post
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
            job_poster_impact,
            branch,
            division
            )
            VALUES
            (@job_post_id,1,'','',:city_en,:title_en, :impact_en, :branch_en, :division_en),
            (@job_post_id,2,'','',:city_fr,:title_fr, :impact_fr, :branch_fr, :division_fr);";            
        
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
            
        
        $sqlStr_EssentialType = '(SELECT ct.criteria_type_id INTO @essential_type FROM criteria_type ct WHERE ct.criteria_type = "essential")';
        $core_competency_data = [];
        $core_competency_values = [];
        foreach($jobPosterNonLocalized->getCore_competencies_en() as $core_competency) {
            $core_competency_values[] = '(@job_post_id, 1, @essential_type, ?)';
            $core_competency_data[] = $core_competency;
        }
        foreach($jobPosterNonLocalized->getCore_competencies_fr() as $core_competency) {
            $core_competency_values[] = '(@job_post_id, 2, @essential_type, ?)';
            $core_competency_data[] = $core_competency;
        }
        $sqlStr5 = "INSERT INTO criteria
            (job_poster_id, locale_id, criteria_type_id, criteria_name) VALUES " . 
            implode(',', $core_competency_values) . ";";
        
        $sqlStr_AssetType = '(SELECT ct.criteria_type_id INTO @asset_type FROM criteria_type ct WHERE ct.criteria_type = "asset")';
        
        $dev_competency_data = [];
        $dev_competency_values = [];
        foreach($jobPosterNonLocalized->getDeveloping_competencies_en() as $dev_competency) {
            $dev_competency_values[] = '(@job_post_id, 1, @asset_type, ?)';
            $dev_competency_data[] = $dev_competency;
        }
        foreach($jobPosterNonLocalized->getDeveloping_competencies_fr() as $dev_competency) {
            $dev_competency_values[] = '(@job_post_id, 2,  @asset_type, ?)';
            $dev_competency_data[] = $dev_competency;
        }
        $sqlStr6 = "INSERT INTO criteria
            (job_poster_id, locale_id, criteria_type_id, criteria_name) VALUES " . 
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
        
        $question_data = [];
        $question_values = [];
        foreach($jobPosterNonLocalized->getQuestions_en() as $question) {
            $question_values[] = '(@job_post_id, 1, ?)';
            $question_data[] = $question;
        }
        foreach($jobPosterNonLocalized->getQuestions_fr() as $question) {
            $question_values[] = '(@job_post_id, 2, ?)';
            $question_data[] = $question;
        }
        $sqlQuestionsStr = "INSERT INTO job_poster_question
            (job_poster_id, locale_id, question) VALUES " .
            implode(",", $question_values) . ";";
        
        $sqlManagerStr = "INSERT INTO job_poster_to_manager_user_id
            (job_poster_id, user_id)
            VALUES
            (@job_post_id, :manager_user_id);";    
        
        $sql1 = $link->prepare($sqlStr1);
        $sql2 = $link->prepare($sqlStr2);
        $sql3 = $link->prepare($sqlStr3);
        
        $sqlManager = $link->prepare($sqlManagerStr);
        $sqlEssentialType = $link->prepare($sqlStr_EssentialType);
        $sqlAssetType = $link->prepare($sqlStr_AssetType);
        
        if (sizeof($key_task_data) > 0)
            $sql4 = $link->prepare($sqlStr4);
        if (sizeof($core_competency_data) > 0)
            $sql5 = $link->prepare($sqlStr5);
        if (sizeof($dev_competency_data) > 0)
            $sql6 = $link->prepare($sqlStr6);
        if (sizeof($requirement_data) > 0)
            $sql7 = $link->prepare($sqlStr7);
        if (sizeof($question_data) > 0)
            $sqlQuestions = $link->prepare($sqlQuestionsStr);
        
        
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
        
        $jpCity = $jobPosterNonLocalized->getCity_en();
        $sql3->bindValue(':city_en', $jpCity, PDO::PARAM_STR);
        $sql3->bindValue(':city_fr', $jpCity, PDO::PARAM_STR);
        $sql3->bindValue(':title_en', $jobPosterNonLocalized->getTitle_en(), PDO::PARAM_STR);
        $sql3->bindValue(':title_fr', $jobPosterNonLocalized->getTitle_fr(), PDO::PARAM_STR);
        $sql3->bindValue(':impact_en', $jobPosterNonLocalized->getImpact_en(), PDO::PARAM_LOB);
        $sql3->bindValue(':impact_fr', $jobPosterNonLocalized->getImpact_fr(), PDO::PARAM_LOB);
        $sql3->bindValue(":branch_en", $jobPosterNonLocalized->getBranch_en(), PDO::PARAM_STR);
        $sql3->bindValue(":branch_fr", $jobPosterNonLocalized->getBranch_fr(), PDO::PARAM_STR);
        $sql3->bindValue(":division_en", $jobPosterNonLocalized->getDivision_en(), PDO::PARAM_STR);
        $sql3->bindValue(":division_fr", $jobPosterNonLocalized->getDivision_fr(), PDO::PARAM_STR);
        
        $sqlManager->bindValue(':manager_user_id', $jobPosterNonLocalized->getManager_user_id(), PDO::PARAM_INT);
       
        $job_post_id = null;
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            $link->beginTransaction();
            $sql1->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $job_post_id = $link->lastInsertId();
            $sql2->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql3->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            
            $sqlManager->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            
            $sqlEssentialType->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sqlAssetType->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            
            if (sizeof($key_task_data) > 0)
                 $sql4->execute($key_task_data) or die("ERROR: " . implode(":", $link->errorInfo()));
            if (sizeof($core_competency_data) > 0)
                $sql5->execute($core_competency_data) or die("ERROR: " . implode(":", $link->errorInfo()));
            if (sizeof($dev_competency_data) > 0)
                $sql6->execute($dev_competency_data) or die("ERROR: " . implode(":", $link->errorInfo()));
            if (sizeof($requirement_data) > 0)
                $sql7->execute($requirement_data) or die("ERROR: " . implode(":", $link->errorInfo()));
            if (sizeof($question_data) > 0)
                $sqlQuestions->execute ($question_data) or die("ERROR: " . implode(":", $link->errorInfo()));
            
            $link->commit();
        } catch (PDOException $e) {
            BaseDAO::closeConnection($link);
            return 'createJobPoster failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $job_post_id;
    }
    
    
    /**
     * 
     * @param type $locale
     * @return type
     */
    public static function getJobPostersByManagerId($locale,$managerId) {

        $link = BaseDAO::getConnection();
        $sqlStr = "
            SELECT jp.job_poster_id as id,
            l.locale_id as locale_id,
            jp_to_user.user_id as manager_user_id,
            jpd.job_poster_title as title,
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
            jpd.branch as branch,
            jpd.division as division,
            pd.province_details_name as location_province,
            cd.city_details_name as location_city,
            jp.job_poster_remuneration_min as remuneration_range_low,
            jp.job_poster_remuneration_max as remuneration_range_high,
            jpd.job_poster_impact as impact
            FROM job_poster jp, job_poster_details jpd, 
                locale l, 
                job_poster_to_manager_user_id jp_to_user,
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
            AND jp_to_user.job_poster_id = jp.job_poster_id
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
            $sql->setFetchMode( PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'JobPoster',array('id', 'locale_id', 'manager_user_id', 'title', 'description', 'applicants_to_date', 'term_qty', 'term_units', 'job_min_level', 'job_max_level', 'job_start_date', 'open_date', 'close_date', 'department', 'branch', 'division', 'location_province', 'location_city','remuneration_range_low','remuneration_range_high','impact','key_tasks','core_competencies','dev_competencies','other_qualifications'));
            $jobPosters = $sql->fetchAll();
            //var_dump($rows);
        } catch (PDOException $e) {
            BaseDAO::closeConnection($link);
            return 'getJobPostersByLocale failed: ' . $e->getMessage();
        }
        foreach ($jobPosters as $jobPoster) {
            self::fetchArrayItemsForJobPoster($jobPoster, $locale);
        }
        
        return $jobPosters;
    }
    
}

?>