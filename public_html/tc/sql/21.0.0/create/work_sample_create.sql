-- MySQL Workbench Synchronization
-- Generated: 2018-05-02 14:59
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Owner

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE TABLE IF NOT EXISTS `talentcloud`.`work_sample` (
  `work_sample_id` INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `work_sample_name` VARCHAR(45) NOT NULL,
  `work_sample_date_created` DATE NOT NULL,
  `file_type_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `work_sample_url` VARCHAR(65) NOT NULL,
  `work_sample_story` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`work_sample_id`),
  INDEX `fk_work_sample_file_type_id_idx` (`file_type_id` ASC),
  CONSTRAINT `fk_work_sample_file_type_id`
    FOREIGN KEY (`file_type_id`)
    REFERENCES `talentcloud`.`file_type` (`file_type_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `talentcloud`.`application_work_sample` (
  `application_work_sample_id` INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `job_poster_application_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `criteria_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `work_sample_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `is_active` TINYINT NOT NULL DEFAULT 1, 
  PRIMARY KEY (`application_work_sample_id`),
  INDEX `fk_application_work_sample_application_id_idx` (`job_poster_application_id` ASC),
  INDEX `fk_application_work_sample_criteria_id_idx` (`criteria_id` ASC),
  INDEX `fk_application_work_sample_id_idx` (`work_sample_id` ASC),
  CONSTRAINT `fk_application_work_sample_application_id`
    FOREIGN KEY (`job_poster_application_id`)
    REFERENCES `talentcloud`.`job_poster_application` (`job_poster_application_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_application_work_sample_criteria_id`
    FOREIGN KEY (`criteria_id`)
    REFERENCES `talentcloud`.`criteria` (`criteria_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_application_work_sample_id`
    FOREIGN KEY (`work_sample_id`)
    REFERENCES `talentcloud`.`work_sample` (`work_sample_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
