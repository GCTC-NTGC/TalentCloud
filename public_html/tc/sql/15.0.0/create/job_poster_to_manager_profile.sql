DROP TABLE IF EXISTS `talentcloud`.`job_poster_to_manager_user_id`;
CREATE TABLE `talentcloud`.`job_poster_to_manager_user_id` (
  `job_poster_id` INT ZEROFILL UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED ZEROFILL NOT NULL,
  PRIMARY KEY (`job_poster_id`, `user_id`));
