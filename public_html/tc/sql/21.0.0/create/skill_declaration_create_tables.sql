-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema talentcloud
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema talentcloud
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `talentcloud` DEFAULT CHARACTER SET utf8 ;
USE `talentcloud` ;

-- -----------------------------------------------------
-- Table `talentcloud`.`skill_details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `talentcloud`.`skill_details` ;

CREATE TABLE IF NOT EXISTS `talentcloud`.`skill_details` (
  `skill_details_id` INT(10) ZEROFILL NOT NULL AUTO_INCREMENT,
  `skill_id` INT(10) ZEROFILL NOT NULL,
  `skill_details_locale_id` INT(10) ZEROFILL NOT NULL,
  `skill_details_name` VARCHAR(65) NOT NULL,
  PRIMARY KEY (`skill_details_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `talentcloud`.`experience_level`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `talentcloud`.`experience_level` ;

CREATE TABLE IF NOT EXISTS `talentcloud`.`experience_level` (
  `experience_level_id` INT(10) ZEROFILL NOT NULL AUTO_INCREMENT,
  `experience_level_common` VARCHAR(65) NOT NULL,
  PRIMARY KEY (`experience_level_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `talentcloud`.`skill_level`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `talentcloud`.`skill_level` ;

CREATE TABLE IF NOT EXISTS `talentcloud`.`skill_level` (
  `skill_level_id` INT ZEROFILL NOT NULL AUTO_INCREMENT,
  `skill_level_common_name` VARCHAR(65) NOT NULL,
  PRIMARY KEY (`skill_level_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `talentcloud`.`skill_declaration`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `talentcloud`.`skill_declaration` ;

CREATE TABLE `skill_declaration` (
  `skill_declaration_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `criteria_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_application_id` int(10) unsigned zerofill NOT NULL,
  `experience_level_id` int(10) unsigned zerofill NOT NULL,
  `skill_level_id` int(10) unsigned zerofill NOT NULL,
  `description` mediumtext NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`skill_declaration_id`),
  KEY `fk_experience_level_id_idx` (`experience_level_id`),
  KEY `fk_skill_level_id_idx` (`skill_level_id`),
  KEY `fk_skill_declaration_criteria_id_idx` (`criteria_id`),
  KEY `fk_skill_declaration_application_id_idx` (`job_poster_application_id`),
  CONSTRAINT `fk_skill_declaration_application_id` FOREIGN KEY (`job_poster_application_id`) REFERENCES `job_poster_application` (`job_poster_application_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_skill_declaration_criteria_id` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`criteria_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_skill_declaration_experience_level_id` FOREIGN KEY (`experience_level_id`) REFERENCES `experience_level` (`experience_level_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_skill_declaration_skill_level_id` FOREIGN KEY (`skill_level_id`) REFERENCES `skill_level` (`skill_level_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;


-- -----------------------------------------------------
-- Table `talentcloud`.`experience_level_details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `talentcloud`.`experience_level_details` ;

CREATE TABLE IF NOT EXISTS `talentcloud`.`experience_level_details` (
  `experience_level_details_id` INT(10) ZEROFILL NOT NULL AUTO_INCREMENT,
  `experience_level_details_locale_id` INT(10) ZEROFILL NOT NULL,
  `experience_level_id` INT(10) ZEROFILL NOT NULL,
  `experience_level_details_name` VARCHAR(65) NOT NULL,
  PRIMARY KEY (`experience_level_details_id`),
  CONSTRAINT `fk_experience_level_details_experience_level_id`
    FOREIGN KEY (`experience_level_id`)
    REFERENCES `talentcloud`.`experience_level` (`experience_level_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_experience_level_id_idx` ON `talentcloud`.`experience_level_details` (`experience_level_id` ASC);

-- -----------------------------------------------------
-- Table `talentcloud`.`application_essential_skill_declaration`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `talentcloud`.`application_essential_skill_declaration` ;

CREATE TABLE IF NOT EXISTS `talentcloud`.`application_essential_skill_declaration` (
  `application_essential_skill_declaration_id` INT(10) ZEROFILL NOT NULL AUTO_INCREMENT,
  `skill_declaration_id` INT(10) ZEROFILL NOT NULL,
  `job_poster_application_id` INT(10) ZEROFILL NOT NULL,
  `job_poster_core_competency_id` INT(10) ZEROFILL NOT NULL,
  `is_active` TINYINT NOT NULL,
  `last_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`application_essential_skill_declaration_id`),
  CONSTRAINT `fk_essential_skill_declaration_id`
    FOREIGN KEY (`skill_declaration_id`)
    REFERENCES `talentcloud`.`skill_declaration` (`skill_declaration_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_evidence_id_idx` ON `talentcloud`.`application_essential_skill_declaration` (`skill_declaration_id` ASC);


-- -----------------------------------------------------
-- Table `talentcloud`.`skill_level_details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `talentcloud`.`skill_level_details` ;

CREATE TABLE IF NOT EXISTS `talentcloud`.`skill_level_details` (
  `skill_level_details_id` INT(10) ZEROFILL NOT NULL AUTO_INCREMENT,
  `skill_level_id` INT(10) ZEROFILL NOT NULL,
  `skill_level_details_locale_id` INT(10) ZEROFILL NOT NULL,
  `skill_level_details_name` VARCHAR(65) NOT NULL,
  PRIMARY KEY (`skill_level_details_id`),
  CONSTRAINT `fk_skill_level_details_skill_level_id`
    FOREIGN KEY (`skill_level_id`)
    REFERENCES `talentcloud`.`skill_level` (`skill_level_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_skill_level_id_idx` ON `talentcloud`.`skill_level_details` (`skill_level_id` ASC);


-- -----------------------------------------------------
-- Table `talentcloud`.`application_asset_skill_declaration`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `talentcloud`.`application_asset_skill_declaration` ;

CREATE TABLE IF NOT EXISTS `talentcloud`.`application_asset_skill_declaration` (
  `application_asset_skill_declaration_id` INT(10) ZEROFILL NOT NULL AUTO_INCREMENT,
  `job_poster_application_id` INT(10) ZEROFILL NOT NULL,
  `job_poster_developing_competency_id` INT(10) ZEROFILL NOT NULL,
  `skill_declaration_id` INT(10) ZEROFILL NOT NULL,
  `is_active` TINYINT NOT NULL,
  `last_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`application_asset_skill_declaration_id`),
  CONSTRAINT `fk_asset_skill_declaration_id0`
    FOREIGN KEY (`skill_declaration_id`)
    REFERENCES `talentcloud`.`skill_declaration` (`skill_declaration_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_evidence_id_idx` ON `talentcloud`.`application_asset_skill_declaration` (`skill_declaration_id` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
