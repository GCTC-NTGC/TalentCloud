ALTER TABLE `talentcloud`.`job_poster`
ADD COLUMN `job_poster_classification` VARCHAR(8) NULL DEFAULT NULL AFTER `job_poster_remuneration_max`,
ADD COLUMN `job_poster_clearance_id` VARCHAR(8) NULL DEFAULT NULL AFTER `job_poster_classification`,
ADD COLUMN `job_poster_language_id` VARCHAR(8) NULL DEFAULT NULL AFTER `job_poster_clearance_id`;
