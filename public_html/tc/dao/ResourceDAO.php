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

/**
 * Summary: Data Access Object for Resources
 * 
 * @extends BaseDAO
 */
class ResourceDAO extends BaseDAO {

    /**
     * Summary: obtains list of resource setting from the Resource table in the database
     * @return array $data
     */
    public static function getDBResources() {
        //echo $organization->__toString();
        $link = BaseDAO::getConnection();
        $sqlStr = "SELECT resource_key, resource_value FROM resources";
        $sql = $link->prepare($sqlStr);

        $count = 0;
        $data = array();

        try {
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $rows = $sql->fetchAll(PDO::FETCH_ASSOC);
            foreach ($rows as $row) {
                $data[] = $row;
            }
        } catch (PDOException $e) {
            //var_dump(PDO::errorInfo());
            return 'get Organization failed: ' . $e->getMessage();
        }
        return $data;
        BaseDAO::closeConnection($link);
    }

}

?>