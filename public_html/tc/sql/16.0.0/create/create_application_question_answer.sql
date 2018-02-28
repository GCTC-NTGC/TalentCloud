DROP TABLE IF EXISTS `talentcloud`.`application_question_answer`;
CREATE TABLE `talentcloud`.`application_question_answer` (
  `application_question_answer_id` INT ZEROFILL UNSIGNED NOT NULL AUTO_INCREMENT,
  `job_poster_application_id` INT UNSIGNED ZEROFILL NOT NULL,
  `question` LONGTEXT NOT NULL,
  `answer` LONGTEXT NOT NULL,
  PRIMARY KEY (`application_question_answer_id`));