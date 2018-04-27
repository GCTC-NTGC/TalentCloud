SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE TABLE IF NOT EXISTS `talentcloud`.`evidence_for_criteria` (
  `evidence_for_criteria_id` INT(10) ZEROFILL UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `date_created` DATE NOT NULL,
  `url` VARCHAR(65) NOT NULL,
  `story` TEXT NOT NULL,
  `job_poster_application_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `criteria_id` INT(10) ZEROFILL UNSIGNED NOT NULL,
  PRIMARY KEY (`evidence_for_criteria_id`),
  INDEX `fk_evidence_for_criteria_application_id_idx` (`job_poster_application_id` ASC),
  INDEX `fk_evidence_for_criteria_criteria_id_idx` (`criteria_id` ASC),
  CONSTRAINT `fk_evidence_for_criteria_application_id`
    FOREIGN KEY (`job_poster_application_id`)
    REFERENCES `talentcloud`.`job_poster_application` (`job_poster_application_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_evidence_for_criteria_criteria_id`
    FOREIGN KEY (`criteria_id`)
    REFERENCES `talentcloud`.`criteria` (`criteria_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
