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
require_once '../model/Lookup.php';
require_once '../model/LookupWithDescription.php';

/**
 * Summary: Data Access Object for Resources
 * 
 * @extends BaseDAO
 */
class LookupDAO extends BaseDAO {

    /**
     * Summary: obtains content and template for request page_name, locale and language
     * @return object Page
     */
    public static function getProvincesByLocale($locale) {

        $link = BaseDAO::getConnection();
        $sqlStr = "
            SELECT 
            p.province_id as id, pd.province_details_name as value
            FROM 
            province p, province_details pd, locale l
            WHERE l.locale_iso = :locale
            AND pd.province_details_province_id = p.province_id
            AND l.locale_id = pd.province_details_locale_id
            ORDER BY pd.province_details_name;";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':locale', $locale, PDO::PARAM_STR);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_ASSOC);
            $rows = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getContentByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rows;
    }

    /**
     * Summary: obtains content and template for request page_name, locale and language
     * @return object Page
     */
    public static function getCitiesByLocale($locale) {

        $link = BaseDAO::getConnection();
        $sqlStr = "
            SELECT 
            c.city_id as id, cd.city_details_name as value
            FROM 
            city c, city_details cd, locale l
            WHERE l.locale_iso = :locale
            AND cd.city_details_city_id = c.city_id
            AND l.locale_id = cd.city_details_locale_id
            ORDER BY cd.city_details_name;
            ";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':locale', $locale, PDO::PARAM_STR);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_ASSOC);
            $rows = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getContentByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rows;
    }
    
    /**
     * Summary: obtains content and template for request page_name, locale and language
     * @return object Page
     */
    public static function getDepartmentsByLocale($locale) {

        $link = BaseDAO::getConnection();
        $sqlStr = "
            SELECT 
            d.department_id as id, dd.department_details_name as value
            FROM 
            department d, department_details dd, locale l
            WHERE l.locale_iso = :locale
            AND dd.department_id = d.department_id
            AND l.locale_id = dd.department_details_locale_id
            ORDER BY dd.department_details_name
            ";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':locale', $locale, PDO::PARAM_STR);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_ASSOC);
            $rows = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getContentByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rows;
    }
    
    /**
     * Summary: obtains content and template for request page_name, locale and language
     * @return object Page
     */
    public static function getDivisionsByLocale($locale) {

        $link = BaseDAO::getConnection();
        
        $sqlStr = "
            SELECT 
                d.division_id as id, dd.division_name as value
                FROM 
                division d, division_details dd, locale l
                WHERE l.locale_iso = :locale
                AND dd.division_id = d.division_id
                AND l.locale_id = dd.division_locale_id
                ORDER BY dd.division_name
            ";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':locale', $locale, PDO::PARAM_STR);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_ASSOC);
            $rows = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getDivisionsByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rows;
    }
    
    /**
     * Summary: obtains content and template for request page_name, locale and language
     * @return object Page
     */
    public static function getJobTermsByLocale($locale) {

        $link = BaseDAO::getConnection();
        $sqlStr = "
            SELECT j.job_term_id as id, j.job_term as value
            FROM job_term_details j, locale l
            WHERE l.locale_iso = :locale
            AND j.job_term_locale_id = l.locale_id;
            ";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':locale', $locale, PDO::PARAM_STR);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_ASSOC);
            $rows = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getContentByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rows;
    }
    
    
    /**
     * Summary: obtains content and template for request page_name, locale and language
     * @return object Page
     */
    public static function getBranchesByLocale($locale) {

        $link = BaseDAO::getConnection();
        
        $sqlStr = "
            SELECT 
            b.branch_id as id, bd.branch_details_name as value
            FROM branch b, branch_details bd, locale l
            WHERE l.locale_iso = :locale
            AND bd.branch_id = b.branch_id
            AND l.locale_id = bd.branch_details_locale_id
            ORDER BY bd.branch_details_name
            ";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':locale', $locale, PDO::PARAM_STR);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_ASSOC);
            $rows = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getBranchesByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rows;
    }
    
    public static function getSkillsByLocale($locale) {

        $link = BaseDAO::getConnection();
        $sqlStr = "
            SELECT 
            skill.skill_id as id, skill_details.skill_details_name as value
            FROM 
            skill, skill_detals, locale
            WHERE locale.locale_iso = :locale
            AND skill_details.skill_details_locale_id = locale.locale_id
            AND skill_details.skill_id = skill.skill_id
            ORDER BY skill.skill_id";
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':locale', $locale, PDO::PARAM_STR);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'Lookup');
            $rows = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getSkillsByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rows;
    }
    
    public static function getSkillLevelsByLocale($locale) {

        $link = BaseDAO::getConnection();
        $sqlStr = "
            SELECT 
            sl.skill_level_id as id, sld.skill_level_details_name as value
            FROM 
            skill_level sl, skill_level_details sld, locale
            WHERE locale.locale_iso = :locale
            AND sld.skill_level_details_locale_id = locale.locale_id
            AND sld.skill_level_id = sl.skill_level_id
            ORDER BY sl.skill_level_id";
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':locale', $locale, PDO::PARAM_STR);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'Lookup');
            $rows = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getSkillLevelsByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rows;
    }
    
    public static function getExperienceLevelsByLocale($locale) {

        $link = BaseDAO::getConnection();
        $sqlStr = "
            SELECT 
            el.experience_level_id as id, eld.experience_level_details_name as value
            FROM 
            experience_level el, experience_level_details eld, locale
            WHERE locale.locale_iso = :locale
            AND eld.experience_level_details_locale_id = locale.locale_id
            AND eld.experience_level_id = el.experience_level_id
            ORDER BY el.experience_level_id";
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':locale', $locale, PDO::PARAM_STR);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'Lookup');
            $rows = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getExperienceLevelsByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rows;
    }
    
    public static function getJobSeekerProfileQuestionsByLocale($locale) {
        $link = BaseDAO::getConnection();
        $sqlStr = "
            SELECT 
            q.job_seeker_profile_question_id as id, 
            qd.question as value,
            qd.description as description
            FROM 
            job_seeker_profile_question q, job_seeker_profile_question_details qd, locale
            WHERE locale.locale_iso = :locale
            AND qd.locale_id = locale.locale_id
            AND q.job_seeker_profile_question_id = qd.job_seeker_profile_question_id
            ORDER BY q.job_seeker_profile_question_id";
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':locale', $locale, PDO::PARAM_STR);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'LookupWithDescription');
            $rows = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getJobSeekerProfileQuestionsByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rows;
    }
    
}

?>
