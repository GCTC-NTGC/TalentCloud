-- MySQL Workbench Synchronization
-- Generated: 2018-04-27 14:52
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Owner

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE TABLE IF NOT EXISTS `talentcloud`.`criteria` (
  `criteria_id` INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `criteria_type_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `criteria_name` VARCHAR(45) NOT NULL,
  `criteria_description` VARCHAR(140) NULL DEFAULT NULL,
  `locale_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `job_poster_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  PRIMARY KEY (`criteria_id`, `criteria_type_id`),
  INDEX `fk_criteria_criteria_type_id_idx` (`criteria_type_id` ASC),
  INDEX `fk_criteria_locale_id_idx` (`locale_id` ASC),
  INDEX `fk_criteria_job_poster_idx` (`job_poster_id` ASC),
  CONSTRAINT `fk_criteria_criteria_type_id`
    FOREIGN KEY (`criteria_type_id`)
    REFERENCES `talentcloud`.`criteria_type` (`criteria_type_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_criteria_locale_id`
    FOREIGN KEY (`locale_id`)
    REFERENCES `talentcloud`.`locale` (`locale_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_criteria_job_poster`
    FOREIGN KEY (`job_poster_id`)
    REFERENCES `talentcloud`.`job_poster` (`job_poster_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `talentcloud`.`criteria_type` (
  `criteria_type_id` INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `criteria_type` VARCHAR(45) NOT NULL,
  `criteria_type_description` VARCHAR(140) NULL DEFAULT NULL,
  PRIMARY KEY (`criteria_type_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
