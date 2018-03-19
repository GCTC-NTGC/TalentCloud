DROP TABLE IF EXISTS `talentcloud`.`team_culture`;
CREATE TABLE `talentcloud`.`team_culture` (
  `id` INT(10) ZEROFILL UNSIGNED NOT NULL AUTO_INCREMENT,
  `team_size` INT(10) NOT NULL,
  `gc_directory_url` VARCHAR(255) NOT NULL,
  `narrative_text` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`id`));
  
DROP TABLE IF EXISTS `talentcloud`.`manager_profile_to_team_culture`;
CREATE TABLE `talentcloud`.`manager_profile_to_team_culture` (
  `user_manager_profile_id` int(10) ZEROFILL UNSIGNED NOT NULL,
  `team_culture_id` int(10) NOT NULL,
  PRIMARY KEY (`user_manager_profile_id`)
);
