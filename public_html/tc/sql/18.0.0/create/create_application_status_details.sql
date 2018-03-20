/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  GBowden
 * Created: Mar 20, 2018
 */

  
CREATE TABLE `talentcloud`.`application_status_details` (
  `application_status_details_id` INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `application_status_id` INT(10) ZEROFILL NOT NULL,
  `application_status_locale_id` INT(10) ZEROFILL NOT NULL,
  `application_status` VARCHAR(45) NULL,n
  PRIMARY KEY (`application_status_details_id`));
