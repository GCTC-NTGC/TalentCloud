DROP TABLE IF EXISTS `talentcloud`.`job_application_answer`;
CREATE TABLE `talentcloud`.`job_application_answer` (
  `job_poster_question_id` INT UNSIGNED ZEROFILL NOT NULL,
  `job_application_id` INT UNSIGNED ZEROFILL NOT NULL,
  `answer` LONGTEXT NOT NULL,
  PRIMARY KEY (`job_poster_question_id`, `job_application_id`));