DROP TABLE IF EXISTS `talentcloud`.`work_environment`;
CREATE TABLE `talentcloud`.`work_environment` (
  `id` INT(10) ZEROFILL UNSIGNED NOT NULL AUTO_INCREMENT,
  `remote_allowed` VARCHAR(45) NOT NULL,
  `telework_allowed` VARCHAR(45) NOT NULL,
  `flexible_allowed` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

DROP TABLE IF EXISTS `talentcloud`.`workplace_photo`;
CREATE TABLE `talentcloud`.`workplace_photo` (
  `id` INT(10) ZEROFILL UNSIGNED NOT NULL AUTO_INCREMENT,
  `image` longblob NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mime_type` varchar(45) NOT NULL,
  `size` int(11) NOT NULL,
  `work_environment_id` INT(10) ZEROFILL UNSIGNED NOT NULL,
  `name` varchar(65) NOT NULL,
  `description` longtext NOT NULL,
  PRIMARY KEY (`id`));