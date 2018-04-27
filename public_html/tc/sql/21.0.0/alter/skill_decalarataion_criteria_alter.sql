-- MySQL Workbench Synchronization
-- Generated: 2018-04-27 15:05
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Owner

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

ALTER TABLE `talentcloud`.`skill_declaration` 
CHANGE COLUMN `skill_declaration_id` `skill_declaration_id` INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
ADD COLUMN `criteria_id` INT(10) ZEROFILL UNSIGNED NOT NULL AFTER `skill_declaration_id`,
ADD COLUMN `job_poster_application_id` INT(10) UNSIGNED ZEROFILL NOT NULL AFTER `criteria_id`,
ADD COLUMN `is_active` TINYINT(4) NOT NULL AFTER `description`,
ADD INDEX `fk_skill_declaration_criteria_id_idx` (`criteria_id` ASC),
ADD INDEX `fk_skill_declaration_application_id_idx` (`job_poster_application_id` ASC);

ALTER TABLE `talentcloud`.`skill_declaration` 
ADD CONSTRAINT `fk_skill_declaration_criteria_id`
  FOREIGN KEY (`criteria_id`)
  REFERENCES `talentcloud`.`criteria` (`criteria_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE,
ADD CONSTRAINT `fk_skill_declaration_application_id`
  FOREIGN KEY (`job_poster_application_id`)
  REFERENCES `talentcloud`.`job_poster_application` (`job_poster_application_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
