DROP TABLE IF EXISTS `talentcloud`.`job_poster_question`;
CREATE TABLE `talentcloud`.`job_poster_question` (
  `id` INT(10) ZEROFILL UNSIGNED NOT NULL AUTO_INCREMENT,
  `job_poster_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `locale_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `question` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`));