SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

ALTER TABLE `talentcloud`.`job_seeker_profile` 
DROP COLUMN `job_seeker_profile_about_me`,
DROP COLUMN `job_seeker_profile_superpower`,
DROP COLUMN `job_seeker_profile_worst_exp`,
DROP COLUMN `job_seeker_profile_best_exp`,
DROP COLUMN `job_seeker_profile_accomp`,
CHANGE COLUMN `job_seeker_profile_tagline` `job_seeker_profile_tagline` LONGTEXT CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL ,
CHANGE COLUMN `job_seeker_profile_twitter_link` `job_seeker_profile_twitter_link` VARCHAR(65) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL ,
CHANGE COLUMN `job_seeker_profile_linkedin_link` `job_seeker_profile_linkedin_link` VARCHAR(65) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;