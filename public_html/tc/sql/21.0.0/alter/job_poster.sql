ALTER TABLE `talentcloud`.`job_poster`
ADD COLUMN `job_poster_classification` VARCHAR(8) NOT NULL AFTER `job_poster_remuneration_max`,
ADD COLUMN `job_poster_clearance_id` int(10) unsigned zerofill NOT NULL AFTER `job_poster_classification`,
ADD COLUMN `job_poster_language_id` int(10) unsigned zerofill NOT NULL AFTER `job_poster_clearance_id`;
