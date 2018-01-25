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
            ORDER BY pd.province_details_name";
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
            FROM job_term j, locale l
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
}

?>