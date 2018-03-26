DROP TABLE IF EXISTS `talentcloud`.`work_environment`;
CREATE TABLE `talentcloud`.`work_environment` (
  `id` INT(10) ZEROFILL UNSIGNED NOT NULL AUTO_INCREMENT,
  `remote_allowed` VARCHAR(45) NOT NULL,
  `telework_allowed` VARCHAR(45) NOT NULL,
  `flexible_allowed` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

DROP TABLE IF EXISTS `talentcloud`.`workplace_photo_caption`;
CREATE TABLE `talentcloud`.`workplace_photo_caption` (
  `work_environment_id` INT(10) ZEROFILL UNSIGNED NOT NULL,
  `photo_name` varchar(65) NOT NULL,
  `workplace_photo_id` INT(10) ZEROFILL UNSIGNED DEFAULT NULL,
  `description` varchar(120) NOT NULL,
  PRIMARY KEY (`work_environment_id`, `photo_name`));

DROP TABLE IF EXISTS `talentcloud`.`workplace_photo`;
CREATE TABLE `talentcloud`.`workplace_photo` (
  `id` INT(10) ZEROFILL UNSIGNED NOT NULL AUTO_INCREMENT,
  `image` longblob NOT NULL,
  `mime_type` varchar(45) NOT NULL,
  `size` int(11) NOT NULL,  
  PRIMARY KEY (`id`));
  
DROP TABLE IF EXISTS `talentcloud`.`manager_profile_to_work_environment`;
CREATE TABLE `talentcloud`.`manager_profile_to_work_environment` (
  `user_manager_profile_id` int(10) ZEROFILL UNSIGNED NOT NULL,
  `work_environment_id` int(10) NOT NULL,
  PRIMARY KEY (`user_manager_profile_id`)
);
