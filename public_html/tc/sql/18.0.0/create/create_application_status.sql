/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  GBowden
 * Created: Mar 20, 2018
 */

CREATE TABLE `talentcloud`.`application_status` (
  `application_status_id` INT ZEROFILL NOT NULL AUTO_INCREMENT,
  `application_status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`application_status_id`));
  

