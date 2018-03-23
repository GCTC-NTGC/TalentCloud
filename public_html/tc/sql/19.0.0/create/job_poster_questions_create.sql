DROP TABLE IF EXISTS `talentcloud`.`job_poster_question`;
CREATE TABLE `talentcloud`.`job_poster_question` (
  `id` INT ZEROFILL UNSIGNED NOT NULL AUTO_INCREMENT,
  `job_poster_id` INT UNSIGNED ZEROFILL NOT NULL,
  `question` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`));