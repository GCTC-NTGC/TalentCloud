ALTER TABLE `talentcloud`.`job_poster_details` 
ADD COLUMN `branch` VARCHAR(65) NULL DEFAULT NULL AFTER `job_poster_impact`,
ADD COLUMN `division` VARCHAR(65) NULL DEFAULT NULL AFTER `branch`;