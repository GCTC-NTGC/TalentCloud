ALTER TABLE `talentcloud`.`job_poster_details`
ADD COLUMN `classification_id` VARCHAR(8) NULL DEFAULT NULL AFTER `division`,
ADD COLUMN `clearance_level` VARCHAR(65) NULL DEFAULT NULL AFTER `classification_id`,
ADD COLUMN `language_requirement` VARCHAR(65) NULL DEFAULT NULL AFTER `clearance_level`;
