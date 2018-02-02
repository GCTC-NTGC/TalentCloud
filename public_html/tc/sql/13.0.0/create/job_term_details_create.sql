/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  Tristan O'Rourke
 * Created: Feb 01, 2018
 */
DROP TABLE IF EXISTS `talentcloud`.`job_term_details`;
CREATE TABLE `talentcloud`.`job_term_details` (
  `job_term_details_id` INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `job_term_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `job_term` VARCHAR(45) NULL,
  `job_term_locale_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  PRIMARY KEY (`job_term_details_id`));