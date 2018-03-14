/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  GBowden
 * Created: Mar 14, 2018
 */

CREATE TABLE `talentcloud`.`application_status` (
  `application_status_id` INT ZEROFILL NOT NULL AUTO_INCREMENT,
  `application_status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`application_status_id`));
  
  
CREATE TABLE `talentcloud`.`application_status_details` (
  `application_status_details_id` INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `application_status_id` INT(10) ZEROFILL NOT NULL,
  `application_status_locale_id` INT(10) ZEROFILL NOT NULL,
  `application_status` VARCHAR(45) NULL,
  PRIMARY KEY (`application_status_details_id`));

INSERT INTO `talentcloud`.`application_status` (`application_status`) VALUES ('Submitted');
INSERT INTO `talentcloud`.`application_status` (`application_status`) VALUES ('Requires Action');
INSERT INTO `talentcloud`.`application_status` (`application_status`) VALUES ('Under Review');
INSERT INTO `talentcloud`.`application_status` (`application_status`) VALUES ('Rejected');

INSERT INTO `talentcloud`.`application_status_details` (`application_status_id`, `application_status_locale_id`, `application_status`) VALUES ('1', '1', 'Submitted');
INSERT INTO `talentcloud`.`application_status_details` (`application_status_id`, `application_status_locale_id`, `application_status`) VALUES ('1', '2', 'Soumis');
INSERT INTO `talentcloud`.`application_status_details` (`application_status_id`, `application_status_locale_id`, `application_status`) VALUES ('2', '1', 'Requires Action');
INSERT INTO `talentcloud`.`application_status_details` (`application_status_id`, `application_status_locale_id`, `application_status`) VALUES ('2', '2', 'Nécessite une action');
INSERT INTO `talentcloud`.`application_status_details` (`application_status_id`, `application_status_locale_id`, `application_status`) VALUES ('3', '1', 'Under Review');
INSERT INTO `talentcloud`.`application_status_details` (`application_status_id`, `application_status_locale_id`, `application_status`) VALUES ('3', '2', 'À l\'étude');
INSERT INTO `talentcloud`.`application_status_details` (`application_status_id`, `application_status_locale_id`, `application_status`) VALUES ('4', '1', 'Rejected');
INSERT INTO `talentcloud`.`application_status_details` (`application_status_id`, `application_status_locale_id`, `application_status`) VALUES ('4', '2', 'Rejeté');
