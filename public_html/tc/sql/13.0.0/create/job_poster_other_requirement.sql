/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  Owner
 * Created: 6-Feb-2018
 */

DROP TABLE IF EXISTS `talentcloud`.`job_poster_other_requirement`;
CREATE TABLE `talentcloud`.`job_poster_other_requirement` (
  `job_poster_other_requirement_id` INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `job_poster_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `locale_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `requirement` LONGTEXT NOT NULL,
  PRIMARY KEY (`job_poster_other_requirement_id`));
