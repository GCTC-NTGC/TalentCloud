/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  GBowden
 * Created: Jan 17, 2018
 */
DELIMITER //

CREATE PROCEDURE UPDATE_DATABASE ()

BEGIN;

DECLARE db_version varchar(10);

/** CHECK for current version = 11.0.0 **/
SELECT COUNT(*) INTO param1 FROM t;

/**CREATES**/
SOURCE create/db_version.sql;

/** ALTERS **/
SOURCE alter/department_details_column_rename.sql

/**CONTENT**/
SOURCE content/db_version.sql

/** set version to 11.0.1 **/
UPDATE db_version SET db_version = '11.0.1';
COMMIT;
END //
DELIMITER ;