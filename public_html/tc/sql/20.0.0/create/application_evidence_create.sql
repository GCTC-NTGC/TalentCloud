CREATE TABLE `talentcloud`.`application_evidence` (
  `job_poster_application_id` INT(10) ZEROFILL UNSIGNED NOT NULL,
  `evidence_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  PRIMARY KEY (`job_poster_application_id`, `evidence_id`));