SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE TABLE IF NOT EXISTS `talentcloud`.`micro_reference` (
  `micro_reference_id` INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `micro_reference_name` VARCHAR(45) NOT NULL,
  `micro_reference_email` VARCHAR(45) NOT NULL,
  `micro_reference_relationship_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `micro_reference_observed_from_date` DATE NOT NULL,
  `micro_reference_observed_until_date` DATE NOT NULL,
  `micro_reference_experience_level_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `micro_reference_story` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`micro_reference_id`),
  INDEX `fk_micro_reference_relationship_id_idx` (`micro_reference_relationship_id` ASC),
  INDEX `fk_micro_reference_experience_level_id_idx` (`micro_reference_experience_level_id` ASC),
  CONSTRAINT `fk_micro_reference_relationship_id`
    FOREIGN KEY (`micro_reference_relationship_id`)
    REFERENCES `talentcloud`.`relationship` (`relationship_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_micro_reference_experience_level_id`
    FOREIGN KEY (`micro_reference_experience_level_id`)
    REFERENCES `talentcloud`.`experience_level` (`experience_level_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `talentcloud`.`application_micro_reference` (
  `application_micro_reference_id` INT(10) ZEROFILL UNSIGNED NOT NULL AUTO_INCREMENT,
  `job_poster_application_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `criteria_id` INT(10) ZEROFILL UNSIGNED NOT NULL,
  `micro_reference_id` INT(10) ZEROFILL UNSIGNED NOT NULL,
  `is_active` TINYINT(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`application_micro_reference_id`),
  INDEX `fk_application_micro_reference_application_id_idx` (`job_poster_application_id` ASC),
  INDEX `fk_application_micro_reference_criteria_id_idx` (`criteria_id` ASC),
  INDEX `fk_application_micro_reference_micro_reference_id_idx` (`micro_reference_id` ASC),
  CONSTRAINT `fk_application_micro_reference_application_id`
    FOREIGN KEY (`job_poster_application_id`)
    REFERENCES `talentcloud`.`job_poster_application` (`job_poster_application_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_application_micro_reference_criteria_id`
    FOREIGN KEY (`criteria_id`)
    REFERENCES `talentcloud`.`criteria` (`criteria_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_application_micro_reference_micro_reference_id`
    FOREIGN KEY (`micro_reference_id`)
    REFERENCES `talentcloud`.`micro_reference` (`micro_reference_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;