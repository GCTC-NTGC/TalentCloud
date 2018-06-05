ALTER TABLE `talentcloud`.`job_poster_question` 
CHANGE COLUMN `question` `question` TEXT CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL ,
ADD COLUMN `description` TEXT NULL AFTER `question`;
