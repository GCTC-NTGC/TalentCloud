ALTER TABLE `talentcloud`.`job_poster_details` 
CHANGE COLUMN `job_poster_desc_title` `job_poster_desc_title` TEXT CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL ,
CHANGE COLUMN `job_poster_desc_content` `job_poster_desc_content` TEXT CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL ,
CHANGE COLUMN `job_poster_city` `job_poster_city` TEXT CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL ,
CHANGE COLUMN `job_poster_title` `job_poster_title` TEXT CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL ,
CHANGE COLUMN `job_poster_impact` `job_poster_impact` TEXT CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL ,
CHANGE COLUMN `branch` `branch` TEXT CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL ,
CHANGE COLUMN `division` `division` TEXT CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL ;

ALTER TABLE `talentcloud`.`criteria` 
CHANGE COLUMN `criteria_name` `criteria_name` TEXT NOT NULL ,
CHANGE COLUMN `criteria_description` `criteria_description` TEXT NULL DEFAULT NULL ;

ALTER TABLE `talentcloud`.`work_sample` 
CHANGE COLUMN `work_sample_name` `work_sample_name` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `work_sample_url` `work_sample_url` TEXT NULL DEFAULT NULL ;

ALTER TABLE `talentcloud`.`workplace_photo_caption` 
CHANGE COLUMN `description` `description` TEXT CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL ;

ALTER TABLE `talentcloud`.`user_manager_profile_details` 
CHANGE COLUMN `user_manager_profile_details_branch` `user_manager_profile_details_branch` TEXT CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL ,
CHANGE COLUMN `user_manager_profile_details_division` `user_manager_profile_details_division` TEXT CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL ,
CHANGE COLUMN `user_manager_profile_details_position` `user_manager_profile_details_position` TEXT CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL ;

ALTER TABLE `talentcloud`.`user_manager_profile` 
CHANGE COLUMN `user_manager_profile_linkedin` `user_manager_profile_linkedin` VARCHAR(260) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL ;

