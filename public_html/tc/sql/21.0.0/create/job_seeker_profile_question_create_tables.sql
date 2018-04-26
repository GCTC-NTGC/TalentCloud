SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

ALTER SCHEMA `talentcloud`  DEFAULT COLLATE utf8_general_ci ;

CREATE TABLE IF NOT EXISTS `talentcloud`.`job_seeker_profile_question` (
  `job_seeker_profile_question_id` INT(10) ZEROFILL UNSIGNED NOT NULL AUTO_INCREMENT,
  `common_name` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`job_seeker_profile_question_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `talentcloud`.`job_seeker_profile_question_details` (
  `job_seeker_profile_question_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `locale_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `question` VARCHAR(60) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`job_seeker_profile_question_id`, `locale_id`),
  INDEX `fk_locale_id_idx` (`locale_id` ASC),
  CONSTRAINT `fk_job_seeker_profile_question_id`
    FOREIGN KEY (`job_seeker_profile_question_id`)
    REFERENCES `talentcloud`.`job_seeker_profile_question` (`job_seeker_profile_question_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_locale_id`
    FOREIGN KEY (`locale_id`)
    REFERENCES `talentcloud`.`locale` (`locale_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `talentcloud`.`job_seeker_profile_answer` (
  `job_seeker_profile_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `job_seeker_profile_question_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `answer` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`job_seeker_profile_id`, `job_seeker_profile_question_id`),
  INDEX `fk_job_seeker_profile_question_id_idx` (`job_seeker_profile_question_id` ASC),
  CONSTRAINT `fk_job_seeker_profile_id`
    FOREIGN KEY (`job_seeker_profile_id`)
    REFERENCES `talentcloud`.`job_seeker_profile` (`job_seeker_profile_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_job_seeker_profile_answer_question_id`
    FOREIGN KEY (`job_seeker_profile_question_id`)
    REFERENCES `talentcloud`.`job_seeker_profile_question` (`job_seeker_profile_question_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
