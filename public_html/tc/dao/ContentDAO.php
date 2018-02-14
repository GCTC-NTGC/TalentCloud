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
require_once '../model/Content.php';
require_once '../model/Label.php';

/**
 * Summary: Data Access Object for Resources
 * 
 * @extends BaseDAO
 */
class ContentDAO extends BaseDAO {

    /**
     * Summary: obtains content and template for request page_name, locale and language
     * @return object Page
     */
    public static function getContentByLocale($locale, $contentType) {

        $link = BaseDAO::getConnection();
        $sqlStr = "
            SELECT bc.base_content_key as labelKey, bc.base_content_value as labelValue
            FROM base_content bc, base_content_type bct, locale l
            WHERE l.locale_iso = :locale
            AND bct.base_content_type_name = :content_type
            AND bc.base_content_locale_id = l.locale_id
            AND bc.base_content_type_id = bct.base_content_type_id";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':locale', $locale, PDO::PARAM_STR);
        $sql->bindParam(':content_type', $contentType, PDO::PARAM_STR);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_KEY_PAIR);
            $rows = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getContentByLocale failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rows;
    }

}

?>