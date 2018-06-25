-- MySQL Workbench Synchronization
-- Generated: 2018-06-19 12:17
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Owner

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

ALTER TABLE `talentcloud`.`job_poster_application` 
DROP FOREIGN KEY `fk__job_poster_application__job_seeker_profile`;

ALTER TABLE `talentcloud`.`job_poster_application` 
DROP COLUMN `application_job_seeker_profile_id`,
ADD COLUMN `user_id` INT(10) UNSIGNED ZEROFILL NOT NULL AFTER `last_updated`,
ADD INDEX `fk__job_poster_application__user_idx` (`user_id` ASC),
DROP INDEX `fk__job_poster_application__job_seeker_profile_idx` ;

ALTER TABLE `talentcloud`.`job_poster_application` 
ADD CONSTRAINT `fk__job_poster_application__user`
  FOREIGN KEY (`user_id`)
  REFERENCES `talentcloud`.`user` (`user_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
