/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  GBowden
 * Created: Feb 13, 2018
 */

CREATE TABLE branch_details (
  branch_details_id int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  branch_id int(10) unsigned zerofill NOT NULL,
  branch_details_locale_id int(10) unsigned zerofill NOT NULL,
  branch_details_name varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (branch_details_id)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;