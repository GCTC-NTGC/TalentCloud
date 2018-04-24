ALTER TABLE `talentcloud`.`job_poster_application` 
ADD COLUMN `last_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `job_poster_application_status_id`;