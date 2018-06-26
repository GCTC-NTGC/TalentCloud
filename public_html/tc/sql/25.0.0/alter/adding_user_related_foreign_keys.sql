-- MySQL Workbench Synchronization
-- Generated: 2018-06-19 11:23
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Owner

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

ALTER TABLE `talentcloud`.`department_details` 
ADD INDEX `fk_department_details_department_id_idx` (`department_id` ASC);

ALTER TABLE `talentcloud`.`job_poster_application` 
ADD INDEX `fk__job_poster_application__job_poster_idx` (`application_job_poster_id` ASC),
ADD INDEX `fk__job_poster_application__job_seeker_profile_idx` (`application_job_seeker_profile_id` ASC),
ADD INDEX `fk__job_poster_application__application_status_idx` (`job_poster_application_status_id` ASC);

ALTER TABLE `talentcloud`.`job_poster_question` 
ADD INDEX `fk__job_poster_question__job_poster_idx` (`job_poster_id` ASC),
ADD INDEX `fk__job_poster_question__locale_idx` (`locale_id` ASC);

ALTER TABLE `talentcloud`.`job_poster_to_manager_user_id` 
ADD INDEX `fk_job_poster_to_manager_user_id_user_id_idx` (`user_id` ASC);

ALTER TABLE `talentcloud`.`manager_profile_to_team_culture` 
CHANGE COLUMN `team_culture_id` `team_culture_id` INT(10) UNSIGNED ZEROFILL NOT NULL ,
ADD INDEX `fk__manager_profile_to_team_culture__team_culture_idx` (`team_culture_id` ASC);

ALTER TABLE `talentcloud`.`user_job_seeker_profiles` 
ADD INDEX `fk_user_job_seeker_profiles_profile_id_idx` (`job_seeker_profile_id` ASC);

ALTER TABLE `talentcloud`.`user_manager_profile_details` 
CHANGE COLUMN `user_manager_profile_id` `user_manager_profile_id` INT(10) UNSIGNED ZEROFILL NOT NULL ,
ADD INDEX `fk_user_manager_profile_details_manager_profile_id_idx` (`user_manager_profile_id` ASC);

ALTER TABLE `talentcloud`.`job_application_answer` 
ADD INDEX `fk__job_application_answer__job_application_idx` (`job_application_id` ASC);

ALTER TABLE `talentcloud`.`job_poster_details` 
ADD INDEX `fk__job_poster_details__job_poster_idx` (`job_poster_id` ASC),
ADD INDEX `fk__job_poster_details__locale_idx` (`locale_id` ASC);

ALTER TABLE `talentcloud`.`user_manager_profile` 
CHANGE COLUMN `user_id` `user_id` INT(10) UNSIGNED ZEROFILL NOT NULL ,
ADD INDEX `fk__user_manager_profile__user_idx` (`user_id` ASC);

ALTER TABLE `talentcloud`.`job_poster_key_task` 
ADD INDEX `fk__job_poster_key_task__job_poster_idx` (`job_poster_id` ASC),
ADD INDEX `fk__job_poster_key_task__locale_idx` (`locale_id` ASC);

ALTER TABLE `talentcloud`.`department_details` 
ADD CONSTRAINT `fk_department_details_department_id`
  FOREIGN KEY (`department_id`)
  REFERENCES `talentcloud`.`department` (`department_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;

ALTER TABLE `talentcloud`.`job_poster_application` 
ADD CONSTRAINT `fk__job_poster_application__job_poster`
  FOREIGN KEY (`application_job_poster_id`)
  REFERENCES `talentcloud`.`job_poster` (`job_poster_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE,
ADD CONSTRAINT `fk__job_poster_application__job_seeker_profile`
  FOREIGN KEY (`application_job_seeker_profile_id`)
  REFERENCES `talentcloud`.`job_seeker_profile` (`job_seeker_profile_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE,
ADD CONSTRAINT `fk__job_poster_application__application_status`
  FOREIGN KEY (`job_poster_application_status_id`)
  REFERENCES `talentcloud`.`application_status` (`application_status_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;

ALTER TABLE `talentcloud`.`job_poster_question` 
ADD CONSTRAINT `fk__job_poster_question__job_poster`
  FOREIGN KEY (`job_poster_id`)
  REFERENCES `talentcloud`.`job_poster` (`job_poster_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE,
ADD CONSTRAINT `fk__job_poster_question__locale`
  FOREIGN KEY (`locale_id`)
  REFERENCES `talentcloud`.`locale` (`locale_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;

ALTER TABLE `talentcloud`.`job_poster_to_manager_user_id` 
ADD CONSTRAINT `fk_job_poster_to_manager_user_id_job_poster_id`
  FOREIGN KEY (`job_poster_id`)
  REFERENCES `talentcloud`.`job_poster` (`job_poster_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_job_poster_to_manager_user_id_user_id`
  FOREIGN KEY (`user_id`)
  REFERENCES `talentcloud`.`user` (`user_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `talentcloud`.`manager_profile_to_team_culture` 
ADD CONSTRAINT `fk__manager_profile_to_team_culture__manager_profile`
  FOREIGN KEY (`user_manager_profile_id`)
  REFERENCES `talentcloud`.`user_manager_profile` (`user_manager_profile_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE,
ADD CONSTRAINT `fk__manager_profile_to_team_culture__team_culture`
  FOREIGN KEY (`team_culture_id`)
  REFERENCES `talentcloud`.`team_culture` (`id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;

ALTER TABLE `talentcloud`.`manager_profile_to_work_environment` 
ADD CONSTRAINT `fk_manager_profile_to_work_environment_manager_profile_id`
  FOREIGN KEY (`user_manager_profile_id`)
  REFERENCES `talentcloud`.`user_manager_profile` (`user_manager_profile_id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `talentcloud`.`profile_pic` 
ADD CONSTRAINT `fk_profile_pic_user_id`
  FOREIGN KEY (`user_id`)
  REFERENCES `talentcloud`.`user` (`user_id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `talentcloud`.`user_job_seeker_profiles` 
ADD CONSTRAINT `fk_user_job_seeker_profiles_user_id`
  FOREIGN KEY (`user_id`)
  REFERENCES `talentcloud`.`user` (`user_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE,
ADD CONSTRAINT `fk_user_job_seeker_profiles_profile_id`
  FOREIGN KEY (`job_seeker_profile_id`)
  REFERENCES `talentcloud`.`job_seeker_profile` (`job_seeker_profile_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;

ALTER TABLE `talentcloud`.`user_manager_profile_details` 
ADD CONSTRAINT `fk_user_manager_profile_details_manager_profile_id`
  FOREIGN KEY (`user_manager_profile_id`)
  REFERENCES `talentcloud`.`user_manager_profile` (`user_manager_profile_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;
  
ALTER TABLE `talentcloud`.`job_poster_key_task` 
ADD CONSTRAINT `fk__job_poster_key_task__job_poster`
  FOREIGN KEY (`job_poster_id`)
  REFERENCES `talentcloud`.`job_poster` (`job_poster_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE,
ADD CONSTRAINT `fk__job_poster_key_task__locale`
  FOREIGN KEY (`locale_id`)
  REFERENCES `talentcloud`.`locale` (`locale_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;
  
ALTER TABLE `talentcloud`.`job_application_answer` 
ADD CONSTRAINT `fk__job_application_answer__job_poster_question`
  FOREIGN KEY (`job_poster_question_id`)
  REFERENCES `talentcloud`.`job_poster_question` (`id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE,
ADD CONSTRAINT `fk__job_application_answer__job_application`
  FOREIGN KEY (`job_application_id`)
  REFERENCES `talentcloud`.`job_poster_application` (`job_poster_application_id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `talentcloud`.`job_poster_details` 
ADD CONSTRAINT `fk__job_poster_details__job_poster`
  FOREIGN KEY (`job_poster_id`)
  REFERENCES `talentcloud`.`job_poster` (`job_poster_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE,
ADD CONSTRAINT `fk__job_poster_details__locale`
  FOREIGN KEY (`locale_id`)
  REFERENCES `talentcloud`.`locale` (`locale_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;

ALTER TABLE `talentcloud`.`user_manager_profile` 
ADD CONSTRAINT `fk__user_manager_profile__user`
  FOREIGN KEY (`user_id`)
  REFERENCES `talentcloud`.`user` (`user_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
