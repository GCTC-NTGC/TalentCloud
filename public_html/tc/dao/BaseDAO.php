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

	
	require_once '../config/db.config.inc';
	
     /**
	* Summary: Database connection manager class
	*
	*/
	abstract class BaseDAO {
	
		protected function __construct() {
		
		}
		
		/**
		* Summary: Prepares the connection to the database for the call using global params from the db.config.inc
		*
		* @see db.config.inc
		*
		* @link http://php.net/manual/en/pdo.construct.php
		* @param global $dbhost
		* @param global $dbname
		* @param global $dbusername
		* @param global $dbpassword
		* 
		* @return $link
		*/
		protected static function getConnection() {
                    $dbhost = HOST;
                    $dbusername = USERNAME;
                    $dbpassword = PASSWORD;
                    $dbname = DBNAME;

                    try{
                        $link = new PDO('mysql:host='.$dbhost.';dbname='.$dbname.';charset=utf8',''.$dbusername.'',''.$dbpassword.'');
                        $link->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
                        $link->setAttribute(PDO::ATTR_PERSISTENT, true);
                        $link->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
                        
                        return $link;
                    }catch(PDOException $e){
                        die('<b>Error:</b> '.$e->getMessage());
                    }
		}
		
		/**
		* Summary: Closes the database connection for the provided $link.
		*
		*
		* @param dbconnection $link
		*   $link is the connection required to be closed
		*/
		protected static function closeConnection($link){
                    $link = null;
		}
		
		/**
		 * Summary: transactional execution of any sql string
		 * @param type $link
		 * @param type $sql
		 * @return type
		 */
		protected static function executeDBTransaction($link,$sql){
			try{
				$link->beginTransaction();
				$link->exec($sql);
				$link->commit();
			} catch (Exception $e) {
				$link->rollBack();
				die('<b>Error:</b> '.$e->getMessage());
			}
			return $link;
		}
		
	}
?>