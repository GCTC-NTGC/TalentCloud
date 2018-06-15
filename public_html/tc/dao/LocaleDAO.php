<?php

	
date_default_timezone_set('America/Toronto');
error_reporting(E_ALL);
ini_set("display_errors", 1);
set_time_limit(0);

if (!isset($_SESSION)) {
    session_start();
}

/*set api path*/
set_include_path(get_include_path() . PATH_SEPARATOR);

/** Model Classes */
require_once '../dao/BaseDAO.php';
require_once '../model/Locale.php';

/**
 * Summary: Data Access Object for Comments
 * 
 * @extends BaseDAO
 */
class LocaleDAO extends BaseDAO {
    /**
     * Summary: Inserts the $comment object into the database with the correspoinding
     * $current_organizationSubmission_id.
     *
     * @param Comment object $comment
     *   $comment is the string value of comments from the Comments tab in the data collection tool
     * 
     * @param int $current_organizationSubmission_id
     *   $current_organizationSubmission_id is primary key returned after creating the organization_submission
     *
     * @return boolean
     *   true if the insertion was successful
     */

    /**
     * Summary: obtains list of resource setting from the Resource table in the database
     * @return array $data
     */
    public static function getLocales() {
        //echo $organization->__toString();
        $link = BaseDAO::getConnection();
        $sqlStr = 'SELECT 
                    l.locale_id, l.locale_iso
                    FROM 
                    locale l';
        $sql = $link->prepare($sqlStr);

        $locales = array();

        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $rows = $sql->fetchAll(PDO::FETCH_ASSOC);
            /*foreach ($rows as $row) {
                $locales[] = new Locale($row["locale_id"],$row["locale_iso"]);
            }*/
            //var_dump($locales);
        } catch (PDOException $e) {
            //var_dump(PDO::errorInfo());
            return 'get Locales failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rows;
    }


}
?>